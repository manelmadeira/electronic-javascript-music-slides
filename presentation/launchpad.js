import React, { Component } from "react";
import { Text } from "spectacle";

export default class Launchpad extends Component {
  state = {
    keys: null
  }

  componentWillMount() {
    navigator.requestMIDIAccess()
      .then(this.onMIDISuccess.bind(this), this.onMIDIFailure);
  }

  onMIDISuccess(midiAccess) {
    for (const input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage.bind(this);
    }
  }

  onMIDIFailure() {
    console.error('Cant request access to MIDI API');
  }

  getMIDIMessage(midiMessage) {
    console.log(midiMessage);
    this.setState({
      keys: midiMessage.data
    });
  }

  render() {
    const { keys } = this.state;

    return (
      <div>
        { keys
          ? <Text>[ {keys.join(", ")} ]</Text>
          : <Text>Press a Launchpad key</Text>
        }
      </div>
    );
  }
}
