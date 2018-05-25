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

class OscillatorExample extends Component {
  state = {
    analyser: null,
    osc: null,
    gain: null,
    frequency: "440",
    type: "sine",
    gainValue: 0.5
  }

  drawCanvas(myCanvas, bufferLength, dataArray) {
    myCanvas.beginPath();
    const sliceWidth = WIDTH * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {

      const v = dataArray[i] / 128.0;
      const y = v * HEIGHT / 2;

      if (i === 0) {
        myCanvas.moveTo(x, y);
      } else {
        myCanvas.lineTo(x, y);
      }

      x += sliceWidth;
    }
  }

  draw() {
    const { analyser, dataArray, myCanvas, bufferLength } = this.state;

    requestAnimationFrame(this.draw.bind(this));

    if (!analyser) { return; }

    analyser.getByteTimeDomainData(dataArray);
    const canvas = document.querySelector("#myCanvas");

    myCanvas.fillStyle = "#faf8f5";
    myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
    myCanvas.lineWidth = 2;
    myCanvas.strokeStyle = "rgb(0, 0, 0)";

    this.drawCanvas(myCanvas, bufferLength, dataArray);

    myCanvas.lineTo(canvas.width, canvas.height / 2);
    myCanvas.stroke();
  }

  startAnalyser(analyser) {
    const canvas = document.querySelector("#myCanvas");
    const myCanvas = canvas.getContext("2d");

    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.getByteTimeDomainData(dataArray);

    myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

    return {
      dataArray,
      bufferLength,
      myCanvas
    };
  }

  createNodes(ac, analyser) {
    const { frequency, type, gainValue } = this.state;

    const oscNode = ac.createOscillator();
    const gainNode = ac.createGain();

    oscNode.type = type;
    oscNode.frequency.value = frequency;

    gainNode.gain.value = gainValue;

    oscNode.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(ac.destination);
    oscNode.start();

    return {
      oscNode,
      gainNode
    };
  }

  handleStart() {
    const { osc } = this.state;

    if (osc) {
      osc.stop();
    }

    const ac = new AudioContext();
    const analyser = ac.createAnalyser();

    const { oscNode, gainNode } = this.createNodes(ac, analyser);
    const { dataArray, bufferLength, myCanvas } = this.startAnalyser(analyser);

    this.draw();

    this.setState({
      analyser,
      osc: oscNode,
      gain: gainNode,
      dataArray,
      bufferLength,
      myCanvas
    });
  }

  handleStop() {
    const { osc } = this.state;

    if (!osc) {
      return;
    }

    osc.stop();
  }

  handleFrequencyChange({ target }) {
    const { osc } = this.state;
    osc.frequency.value = target.value;

    this.setState({
      frequency: target.value
    });
  }

  handleTypeChange({ target }) {
    const { osc } = this.state;
    osc.type = target.value;

    this.setState({
      type: target.value
    });
  }

  handleGainChange({ target }) {
    const { gain } = this.state;
    gain.gain.value = target.value;

    this.setState({
      gainValue: target.value
    });
  }

  render() {
    const { frequency, type, gainValue } = this.state;

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
            <label htmlFor="frequency">
              Frequency
            </label>
            <input
              id="frequency"
              type="range"
              min="50"
              max="2000"
              step="10"
              value={frequency}
              onChange={this.handleFrequencyChange.bind(this)}
            />
          </Control>

          <Control>
            <label htmlFor="gain">
              Gain
            </label>
            <input
              id="gain"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={gainValue}
              onChange={this.handleGainChange.bind(this)}
            />
          </Control>

          <Control>
            <select value={type} onChange={this.handleTypeChange.bind(this)}>
              <option value="sawtooth">Sawtooth</option>
              <option value="sine">Sine</option>
              <option value="square">Square</option>
              <option value="triangle">Triangle</option>
            </select>
          </Control>
        </Controls>
      </Wrapper>
    );
  }
}

export default OscillatorExample;
