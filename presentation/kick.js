import React, { Component } from "react";
import styled from "react-emotion";

const Button = styled("button")`
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #fff;
  border: 2px solid #1F2022;

  :hover {
    cursor: pointer;
  }
`;

export default class Kick extends Component {
  setup() {
    this.context = new AudioContext();
    this.osc = this.context.createOscillator();
    this.gain = this.context.createGain();

    this.osc.connect(this.gain);
    this.gain.connect(this.context.destination);
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
