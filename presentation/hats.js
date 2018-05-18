import React, { Component } from "react";
import styled from "react-emotion";

const Button = styled("button") `
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #fff;
  border: 2px solid #1F2022;

  :hover {
    cursor: pointer;
  }
`;

export default class Hats extends Component {
  noiseBuffer() {
    const bufferSize = this.context.sampleRate;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  setup() {
    this.context = new AudioContext();
    this.noise = this.context.createBufferSource();
    this.noise.buffer = this.noiseBuffer();

    const noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = "highpass";
    noiseFilter.frequency.value = 5000;

    this.noiseEnvelope = this.context.createGain();
    this.noiseEnvelope.gain.value = 1;

    this.noise.connect(this.noiseEnvelope);
    this.noiseEnvelope.connect(noiseFilter);
    noiseFilter.connect(this.context.destination);
  }

  trigger() {
    this.setup();

    this.noiseEnvelope.gain.setTargetAtTime(0.0, this.context.currentTime, 0.02);

    this.noise.start();
    this.noise.stop(0.5);
  }

  render() {
    return (
      <Button
        type="button"
        onClick={this.trigger.bind(this)}
      >
        🔉
      </Button>
    );
  }
}
