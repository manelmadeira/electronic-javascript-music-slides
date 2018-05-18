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

export default class Snare extends Component {
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
    noiseFilter.frequency.value = 1000;
    this.noise.connect(noiseFilter);

    this.noiseEnvelope = this.context.createGain();
    noiseFilter.connect(this.noiseEnvelope);

    this.noiseEnvelope.connect(this.context.destination);

    this.osc = this.context.createOscillator();
    this.osc.type = "triangle";

    this.oscEnvelope = this.context.createGain();
    this.osc.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.context.destination);
  }

  trigger() {
    this.setup();

    this.noiseEnvelope.gain.value = 1;
    this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, 0.2);

    this.osc.frequency.value = 100;
    this.oscEnvelope.gain.value = 0.7;
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, 0.1);

    this.osc.start();
    this.noise.start();
    this.osc.stop(0.2);
    this.noise.stop(0.2);
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
