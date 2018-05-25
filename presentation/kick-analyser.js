import React, { Component } from "react";
import styled from "react-emotion";
import { Text } from "spectacle";

const WIDTH = 800;
const HEIGHT = 400;

const Button = styled("button") `
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #fff;
  border: 2px solid #1F2022;

  :hover {
    cursor: pointer;
  }
`;

const Analyser = styled("div") `
  flex: 1;
`;

const Comparision = styled("div") `
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  p, button {
    margin: 0 10px 0 0;
  }

  p {
    font-size: 24px;
  }
`;

export default class KickAnalyser extends Component {
  state = {
    analyser: null
  }

  setup() {
    this.context = new AudioContext();
    const analyser = this.context.createAnalyser();
    this.osc = this.context.createOscillator();
    this.gain = this.context.createGain();

    this.osc.connect(this.gain);
    this.gain.connect(analyser);
    analyser.connect(this.context.destination);

    const { dataArray, bufferLength, myCanvas } = this.startAnalyser(analyser);

    this.draw();

    this.setState({
      analyser,
      dataArray,
      bufferLength,
      myCanvas
    });
  }

  trigger() {
    this.setup();

    this.osc.frequency.value = 150;
    this.gain.gain.value = 1;

    this.osc.frequency.exponentialRampToValueAtTime(0.01, 0.5);
    this.gain.gain.exponentialRampToValueAtTime(0.01, 0.5);

    this.osc.start();
    this.osc.stop(0.5);
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

    if (!canvas) {
      return;
    }

    myCanvas.fillStyle = "#faf8f5";
    myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
    myCanvas.lineWidth = 2;
    myCanvas.strokeStyle = "rgb(0, 0, 0)";

    this.drawCanvas(myCanvas, bufferLength, dataArray);

    myCanvas.lineTo(canvas.width, canvas.height / 2);
    myCanvas.stroke();
  }

  render() {
    const { kick } = this.props;

    return (
      <div>
        <Analyser>
          <canvas
            id="myCanvas"
            width="800"
            height="400"
          />
        </Analyser>

        <Comparision>
          <Text>Real Sample:</Text>
          <audio src={kick} controls loop />

          <Text style={{ fontWeight: 700, margin: "0 20px 0 !important" }}>vs</Text>

          <Text>Web Audio:</Text>
          <Button
            type="button"
            onClick={this.trigger.bind(this)}
          >
            🔉
          </Button>
        </Comparision>
      </div>
    );
  }
}
