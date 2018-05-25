// Import React
import React from "react";

import "./prism.css";

// Import Spectacle Core tags
import {
  BlockQuote,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  Slide,
  Text,
  CodePane,
  Image,
  Link
} from "spectacle";

import OscillatorExample from "./oscillator";
import BiquadFilterExample from "./biquadfilter";
import KickNode from "./kick";
import SnareNode from "./snare";
import HatsNode from "./hats";
import BassNode from "./bass";
import Launchpad from "./launchpad";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

const preload = (imageCollection) => {
  Object.keys(imageCollection).forEach((key) => {
    const src = imageCollection[key];
    const image = new Image();
    image.src = src;
  });
};

const kick = require("../assets/kick.wav");
const snare = require("../assets/snare.wav");
const hats = require("../assets/hats.wav");
const bass = require("../assets/bassline.wav");

const images = {
  audioNodesImg: require("../assets/audionodes.jpg"),
  edmCatsImg: require("../assets/edm-cats.webp"),
  launchpadImg: require("../assets/launchpad.webp"),
  webMidiApiImg: require("../assets/web-midi-api-caniuse.png")
};

preload(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#4183D7",
  quarternary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["fade"]} transitionDuration={500} theme={theme}>
        <Slide>
          <Heading size={1} caps>
            Electronic Javascript Music
          </Heading>
          <Heading
            size={6}
            lineHeight={1.5}
            margin="40px 0 0"
            textColor="quarternary"
            bold
            fit
          >
            Electronic Dance Music meets Javascript
          </Heading>
        </Slide>

        <Slide>
          <Heading size={2} margin="0 0 50px">
            Why?
          </Heading>

          <Heading size={2}>
            🤔
          </Heading>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 100px"
            textColor="secondary"
          >
            Inspiration
          </Heading>

          <List>
            <ListItem margin="0 0 50px">
              <Link textColor="secondary" style="text-decoration:underline;" href="https://www.youtube.com/watch?v=Ww0jTafmd_w">
                Paul Adenot: Elements of Dance Music
              </Link>
            </ListItem>
            <ListItem margin="0 0 50px">
              <Link textColor="secondary" style="text-decoration:underline;" href="https://www.youtube.com/watch?v=cqtBpCqgOgM">
                Jan Monschke: Using the web for music production and for live performances
              </Link>
            </ListItem>
            <ListItem>
              <Link textColor="secondary" style="text-decoration:underline;" href="https://www.youtube.com/watch?v=NL0nb8A8FDM">
                Matt McKegg: I Play The JavaScript
              </Link>
            </ListItem>
          </List>
        </Slide>

        <Slide align="center center">
          <Heading
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            Web Audio API
          </Heading>

          <BlockQuote>
            <Quote
              textSize="3rem"
              textColor="quarternary"
            >
              (...) provides a simple yet powerful mechanism to implement and manipulate audio content inside web applications.
            </Quote>
            <Cite>MDN Web Docs</Cite>
          </BlockQuote>
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            AudioContext
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              partial interface AudioContext {
                readonly attribute AudioDestinationNode destination;
                readonly attribute float sampleRate;
                readonly attribute double currentTime;
                // create wave oscillators (sine, sawtooth, etc...)
                OscillatorNode createOscillator ();
                // play audio buffers
                AudioBufferSourceNode createBufferSource ();
                // create filters like lowpass or highpass
                BiquadFilterNode createBiquadFilter ();
                // for data charts
                AnalyserNode createAnalyser ();
                // change volume
                GainNode createGain ();
              }
            `}
          />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            AudioNode
          </Heading>

          <Text>
            The building blocks of an AudioContext.
          </Text>

          <Image
            src={images.audioNodesImg}
            margin="60px auto 0"
          />

          <Text textSize="12px" textColor="#AAA">
            Source: https://www.html5rocks.com/en/tutorials/webaudio/intro/
          </Text>
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            OscillatorNode
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              partial interface OscillatorNode {
                readonly attribute AudioParam frequency;
                readonly attribute AudioParam detune;
                void start (optional double when = 0);
                void stop (optional double when = 0);
              }
            `}
          />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            AudioParam
          </Heading>

          <CodePane
            textSize="16px"
            lang="javascript"
            theme="light"
            source={`
  partial interface AudioParam {
    readonly attribute float defaultValue;
    attribute float value;
    AudioParam setValueAtTime (float value, double startTime);
    AudioParam linearRampToValueAtTime (float value, double endTime);
    AudioParam exponentialRampToValueAtTime (float value, double endTime);
    AudioParam setTargetAtTime (float target, double startTime, float timeConstant);
    AudioParam setValueCurveAtTime (Float32Array values, double startTime, double duration);
  }
            `}
          />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            OscillatorNode
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              const ac = new AudioContext();
              const osc = ac.createOscillator();
              const gain = ac.createGain();

              osc.type = 'sine';
              osc.frequency.value = 300;

              gain.gain.value = 0.5;

              osc.connect(gain);
              gain.connect(ac.destination);

              osc.start();
            `}
          />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            OscillatorNode
          </Heading>

          <OscillatorExample />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            BiquadFilterNode
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
      const osc = ac.createOscillator();
      const osc2 = ac.createOscillator();
      const gain = ac.createGain();
      const gain2 = ac.createGain();
      const biquad = ac.createBiquadFilter();

      osc.type = osc2.type = 'sawtooth';
      osc.frequency.value = osc2.frequency.value = 120;
      osc2.detune.value = 30;

      biquad.type = "lowpass";
      biquad.Q.value = 25;
      biquad.frequency.value = 100;
            `}
          />

          <Text textSize="1.5rem" margin="30px 0 0">To be continued 👉</Text>
        </Slide>

        <Slide>
          <Heading
            margin="0 0 20px"
            size={3}
            textColor="secondary"
          >
            BiquadFilterNode
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
      osc.connect(gain);
      osc2.connect(gain);

      gain.connect(biquad);
      biquad.connect(gain2);

      gain2.connect(ac.destination);

      osc.start();
      osc2.start();
            `}
          />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            BiquadFilterNode
          </Heading>

          <BiquadFilterExample />
        </Slide>

        <Slide>
          <Heading size={3} textColor="secondary">
            How does this connect with EDM?
          </Heading>

          <Image
            src={images.edmCatsImg}
            margin="60px auto 0"
          />
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 50px"
            textColor="secondary"
          >
            Some Samples
          </Heading>

          <List>
            <ListItem>
              TR-808 Kick
              <audio src={kick} controls loop style={{ marginLeft: "50px" }}/>
            </ListItem>
            <ListItem>
              TR-808 Hats
              <audio src={hats} controls loop style={{ marginLeft: "43px" }}/>
            </ListItem>
            <ListItem>
              TR-808 Snare
              <audio src={snare} controls loop style={{ marginLeft: "21px" }}/>
            </ListItem>
            <ListItem>
              TB-303 Bass
              <audio src={bass} controls loop style={{ marginLeft: "47px" }}/>
            </ListItem>
          </List>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Kick Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              const osc = ac.createOscillator();
              const gain = ac.createGain();

              osc.frequency.value = 150;
              gain.gain.value = 1;

              osc.frequency.exponentialRampToValueAtTime(0.01, 0.5);
              gain.gain.exponentialRampToValueAtTime(0.01, 0.5);

              osc.connect(this.gain);
              gain.connect(ac.destination);

              osc.start();
              osc.stop(0.5);
            `}
          />

          <KickNode />
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Hats Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
      const noise = ac.createBufferSource();
      // function that generates random numbers beetween [-1, 1]
      noise.buffer = noiseBuffer();

      const noiseEnvelope = ac.createGain();
      noiseEnvelope.gain.value = 1;

      const noiseFilter = ac.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.value = 5000;
            `}
          />

          <Text textSize="1.5rem" margin="30px 0 0">To be continued 👉</Text>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Hats Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
      noise.connect(noiseEnvelope);
      noiseEnvelope.connect(noiseFilter);
      noiseFilter.connect(ac.destination);

      noiseEnvelope.gain.setTargetAtTime(0.0, ac.currentTime, 0.02);

      noise.start();
      noise.stop(0.5);
            `}
          />

          <HatsNode />
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Snare Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              const noise = ac.createBufferSource();
              // function that generates random numbers beetween [-1, 1]
              noise.buffer = noiseBuffer();

              const noiseFilter = ac.createBiquadFilter();
              noiseFilter.type = "highpass";
              noiseFilter.frequency.value = 1000;

              const noiseEnvelope = ac.createGain();

              noise.connect(noiseEnvelope);
              noiseEnvelope.connect(noiseFilter);
              noiseFilter.connect(ac.destination);
            `}
          />

          <Text textSize="1.5rem" margin="30px 0 0">To be continued 👉</Text>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Snare Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              const osc = ac.createOscillator();
              osc.type = "triangle";
              osc.frequency.value = 100;

              const oscEnvelope = ac.createGain();
              osc.connect(oscEnvelope);
              oscEnvelope.connect(ac.destination);
            `}
          />

          <Text textSize="1.5rem" margin="30px 0 0">To be continued 👉</Text>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Snare Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              noiseEnvelope.gain.value = 1;
              noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, 0.2);

              oscEnvelope.gain.value = 0.7;
              oscEnvelope.gain.exponentialRampToValueAtTime(0.01, 0.1);

              osc.start();
              noise.start();
              osc.stop(0.2);
              noise.stop(0.2);
            `}
          />

          <SnareNode />
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Bass Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              const osc = ac.createOscillator();
              const osc2 = ac.createOscillator();

              osc.type = "sawtooth";
              osc2.type = "sawtooth";

              osc2.detune = 20;

              const gain = ac.createGain();
              gain.gain.value = 1;

              const gain2 = ac.createGain();
              gain2.gain.value = 0.5;
            `}
          />

          <Text textSize="1.5rem" margin="30px 0 0">To be continued 👉</Text>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Bass Sound
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              const filter = ac.createBiquadFilter();
              filter.type = "lowpass";
              filter.frequency.value = 300;
              filter.Q.value = 25;

              osc.connect(gain);
              osc2.connect(gain);
              gain.connect(filter);
              filter.connect(gain2);
              gain2.connect(ac.destination);
            `}
          />

          <Text textSize="1.5rem" margin="30px 0 0">To be continued 👉</Text>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Bass Sound
          </Heading>

          <CodePane
            textSize="16px"
            margin="0 0 20px"
            lang="javascript"
            theme="light"
            source={`
              function note2freq (note) {
                return Math.pow(2, (note - 69) / 12) * 440;
              }
            `}
          />

          <CodePane
            textSize="16px"
            lang="javascript"
            theme="light"
            source={`
              // 36 MIDI note equals to a C
              osc.frequency.value = note2freq(36);
              osc2.frequency.value = note2freq(36);

              gain.gain.setTargetAtTime(0.0, ac.currentTime, 0.1);
              filter.frequency.setTargetAtTime(3000, ac.currentTime, 0.05);

              osc.start();
              osc2.start();
              osc.stop(1);
              osc2.stop(1);
            `}
          />

          <BassNode />
        </Slide>

        <Slide>
          <Heading
            size={2}
            textColor="secondary"
          >
            How can we play this sounds?
          </Heading>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 100px"
            textColor="secondary"
          >
            MIDI Instruments
          </Heading>

          <Image src={images.launchpadImg} />
        </Slide>
        <Slide>
          <Heading
            size={3}
            margin="0 0 30px"
            textColor="secondary"
          >
            Web MIDI API*
          </Heading>


          <Text textSize="1.5rem" margin="0 0 80px">
            *in working draft stage
          </Text>

          <Image src={images.webMidiApiImg} />
          <Text textSize="12px" textColor="#AAA" textAlign="left">
            Source: https://caniuse.com/#search=web%20midi%20api
          </Text>
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 20px"
            textColor="secondary"
          >
            Web MIDI API
          </Heading>

          <CodePane
            textSize="18px"
            lang="javascript"
            theme="light"
            source={`
              navigator.requestMIDIAccess()
                .then(onMIDISuccess, onMIDIFailure);

              function onMIDIFailure() {
                // do something with the error
              }

              function onMIDISuccess(midiAccess) {
                for (let input of midiAccess.inputs.values()) {
                  input.onmidimessage = getMIDIMessage;
                }
              }

              function getMIDIMessage(midiMessage) {
                console.log(midiMessage.data);
              }
            `}
          />
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 100px"
            textColor="secondary"
          >
            Web MIDI API
          </Heading>

          <Launchpad />
        </Slide>

        <Slide>
          <Heading
            size={2}
            margin="0 0 100px"
            textColor="secondary"
          >
            Web Audio API <br />+<br /> Web MIDI API
          </Heading>

          <Heading
            size={5}
            textColor="secondary"
            textColor="tertiary"
          >
            🙌  Demo  🙌
          </Heading>
        </Slide>

        <Slide>
          <Heading
            size={1}
            margin="0 0 100px"
            textColor="secondary"
          >
            Thank You!
          </Heading>

          <Text
            size={6}
            margin="0 0 30px"
          >
            @maneljmadeira
          </Text>
          <Text>
            manuel.madeira@mindera.com
          </Text>
        </Slide>
      </Deck>
    );
  }
}
