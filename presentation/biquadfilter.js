import styled from "react-emotion";
import React, { Component } from "react";

const WIDTH = 600;
const HEIGHT = 400;

const Wrapper = styled("div")`
  display: flex;
  font-size: 1.5rem;
`;

const Analyser = styled("div")`
  flex: 1;
`;

const Controls = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
`;

const Control = styled("div")`
  width: 100%;
  margin-bottom: 20px;
  text-align: left;

  > input {
    width: 100%;
  }
`;

const Button = styled("button")`
  padding: 5px 15px;
  margin-right: 10px;
  background-color: #fff;
  border: 2px solid #1F2022;
  color: 1F2022;
`;

class BiquadFilterExample extends Component {
  state = {
    ac: null,
    analyser: null,
    osc: null,
    osc2: null,
    gain: null,
    frequency: "100",
    type: "sawtooth",
    gainValue: 0.5,
    biquad: null,
    biquadType: "lowpass",
    biquadFrequency: 100,
    biquadGain: 0.5,
    biquadQ: 25
  }

  componentWillMount() {
    global.freqs = null;
    global.freqResp = null;
    global.phase = null;
  }

  initializeBiquadDraw() {
    const { ac, analyser } = this.state;

    if (!global.freqResp) {
      global.freqs = new Float32Array(WIDTH);
      global.freqResp = new Float32Array(WIDTH);
      global.phase = new Float32Array(WIDTH);
      for (let i = 0; i < global.freqs.length; i++) {
        global.freqs[i] = (i - 1) * ac.sampleRate / analyser.fftSize;
      }
    }
  }

  drawBiquad() {
    const { biquad, myCanvas } = this.state;
    const o = WIDTH / 20;

    this.initializeBiquadDraw();

    biquad.getFrequencyResponse(global.freqs, global.freqResp, global.phase);

    myCanvas.strokeStyle = "#f00";
    myCanvas.moveTo(o, global.freqResp[0]);

    myCanvas.beginPath();
    for (let i = 0; i < global.freqs.length; i += 2) {
      const db = 20.0 * Math.log(global.freqResp[i]) / Math.LN10;
      const y = Math.min((0.5 * HEIGHT) - 4 * db, HEIGHT - o);
      myCanvas.lineTo(i, y);
    }
    myCanvas.stroke();
  }

  draw() {
    requestAnimationFrame(this.draw.bind(this));

    const { ac, analyser, dataArray, myCanvas } = this.state;
    const o = WIDTH / 20;

    if (!ac || !analyser) { return; }

    analyser.getFloatFrequencyData(dataArray);

    myCanvas.fillStyle = "#FDF6E4";
    myCanvas.fillRect(0, 0, WIDTH, HEIGHT);

    const minDecibels = -analyser.minDecibels;
    const range = -analyser.minDecibels + analyser.maxDecibels;
    for (let i = 0; i < WIDTH; i += 2) {
      myCanvas.fillStyle = "rgb(50, 50, 50)";
      myCanvas.fillRect(i,
        HEIGHT,
        0.8,
        Math.min(-((dataArray[i] + minDecibels) / range) * (HEIGHT - 4 * o), 0));
    }

    this.drawBiquad();
  }

  startAnalyser(analyser) {
    const canvas = document.querySelector("#myCanvas");
    const myCanvas = canvas.getContext("2d");

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

    return {
      dataArray,
      bufferLength,
      myCanvas
    };
  }

  createNodes(ac, analyser) {
    const { frequency, type, gainValue, biquadType } = this.state;

    const oscNode = ac.createOscillator();
    const oscNode2 = ac.createOscillator();
    const gainNode = ac.createGain();
    const gainNode2 = ac.createGain();
    const biquadNode = ac.createBiquadFilter();

    oscNode.type = type;
    oscNode2.type = type;
    oscNode.frequency.value = frequency;
    oscNode2.frequency.value = frequency;
    oscNode2.detune.value = 30;

    gainNode.gain.value = gainValue;

    biquadNode.type = biquadType;
    biquadNode.Q.value = 25;

    oscNode.connect(gainNode);
    oscNode2.connect(gainNode);

    gainNode.connect(biquadNode);
    biquadNode.connect(gainNode2);

    gainNode2.connect(analyser);
    analyser.connect(ac.destination);

    oscNode.start();
    oscNode2.start();

    return {
      oscNode,
      oscNode2,
      gainNode,
      biquadNode
    };
  }

  handleStart() {
    const { osc } = this.state;

    if (osc) {
      osc.stop();
    }

    const ac = new AudioContext();
    const analyser = ac.createAnalyser();

    const { oscNode, oscNode2, gainNode, biquadNode } = this.createNodes(ac, analyser);
    const { dataArray, bufferLength, myCanvas } = this.startAnalyser(analyser);

    this.draw();

    this.setState({
      ac,
      analyser,
      osc: oscNode,
      osc2: oscNode2,
      gain: gainNode,
      biquad: biquadNode,
      dataArray,
      bufferLength,
      myCanvas
    });
  }

  handleStop() {
    const { osc, osc2 } = this.state;

    if (!osc && !osc2) {
      return;
    }

    osc.stop();
    osc2.stop();
  }

  handleFrequencyChange({ target }) {
    const { biquad } = this.state;
    biquad.frequency.value = target.value;

    this.setState({
      biquadFrequency: target.value
    });
  }

  handleQChange({ target }) {
    const { biquad } = this.state;
    biquad.Q.value = target.value;

    this.setState({
      biquadQ: target.value
    });
  }

  handleTypeChange({ target }) {
    const { biquad } = this.state;
    biquad.type = target.value;

    this.setState({
      biquadType: target.value
    });
  }

  render() {
    const { biquadFrequency, biquadQ, biquadType } = this.state;

    return (
      <Wrapper>
        <Analyser>
          <canvas
            id="myCanvas"
            width="600"
            height="400"
          />
        </Analyser>

        <Controls>
          <Control>
            <Button
              type="button"
              onClick={this.handleStart.bind(this)}
            >
              Start
            </Button>
            <Button
              type="button"
              onClick={this.handleStop.bind(this)}
            >
              Stop
            </Button>
          </Control>

          <Control>
            <label htmlFor="biquad-frequency">
              Biquad Frequency
            </label>
            <input
              id="biquad-frequency"
              type="range"
              min="50"
              max="2000"
              step="10"
              value={biquadFrequency}
              onChange={this.handleFrequencyChange.bind(this)}
            />
          </Control>

          <Control>
            <label htmlFor="biquad-q">
              Biquad Q
            </label>
            <input
              id="biquad-q"
              type="range"
              min="0"
              max="100"
              step="1"
              value={biquadQ}
              onChange={this.handleQChange.bind(this)}
            />
          </Control>

          <Control>
            <select value={biquadType} onChange={this.handleTypeChange.bind(this)}>
              <option value="lowpass">lowpass</option>
              <option value="highpass">highpass</option>
              <option value="bandpass">bandpass</option>
            </select>
          </Control>
        </Controls>
      </Wrapper>
    );
  }
}

export default BiquadFilterExample;
