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

export default class Bass extends Component {
  note2freq(note) {
    return Math.pow(2, (note - 69) / 12) * 440;
  }

  setup() {
    this.context = new AudioContext();

    this.osc = this.context.createOscillator();
    this.osc2 = this.context.createOscillator();

    this.osc.type = "sawtooth";
    this.osc2.type = "sawtooth";

    this.gain = this.context.createGain();
    this.gain.gain.value = 1;

    this.gain2 = this.context.createGain();
    this.gain2.gain.value = 0.5;

    this.lp = this.context.createBiquadFilter();
    this.lp.type = "lowpass"
    this.lp.frequency.value = 300;
    this.lp.Q.value = 25;

    this.osc.connect(this.gain);
    this.osc2.connect(this.gain);
    this.gain.connect(this.lp);
    this.lp.connect(this.gain2);

    this.gain2.connect(this.context.destination);
  }

  trigger() {
    this.setup();

    this.osc.frequency.value = this.note2freq(36);
    this.osc2.frequency.value = this.note2freq(36);

    this.gain.gain.setTargetAtTime(0.0, this.context.currentTime, 0.1);

    this.lp.frequency.setTargetAtTime(3000, this.context.currentTime, 0.05);

    this.osc.start();
    this.osc.stop(1);
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
