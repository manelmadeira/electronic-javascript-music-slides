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
  Image
} from "spectacle";

import OscillatorExample from "./oscillator";
import BiquadFilterExample from "./biquadfilter";
import KickNode from "./kick";
import SnareNode from "./snare";

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
  edmCatsImg: require("../assets/edm-cats.webp")
};

preload(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quarternary: "#CECECE"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={["fade"]} transitionDuration={500} theme={theme}>
        {/* <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Spectacle Boilerplate
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} fit bold>
            open the presentation/index.js file to get started
          </Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>Typography</Heading>
          <Heading size={1} textColor="secondary">Heading 1</Heading>
          <Heading size={2} textColor="secondary">Heading 2</Heading>
          <Heading size={3} textColor="secondary">Heading 3</Heading>
          <Heading size={4} textColor="secondary">Heading 4</Heading>
          <Heading size={5} textColor="secondary">Heading 5</Heading>
          <Text size={6} textColor="secondary">Standard text</Text>
        </Slide>
        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>
        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide> */}

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
          <Heading size={2}>
            EDM<br />always been a passion
          </Heading>
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
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            AudioContext
          </Heading>

          <CodePane
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
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            OscillatorNode
          </Heading>

          <CodePane
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
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            AudioParam
          </Heading>

          <CodePane
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
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            OscillatorNode
          </Heading>

          <CodePane
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
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            OscillatorNode
          </Heading>

          <OscillatorExample />
        </Slide>

        <Slide>
          <Heading
            margin="0 0 50px"
            size={3}
            textColor="secondary"
          >
            BiquadFilterNode
          </Heading>

          <CodePane
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
              TR-808 Snare
              <audio src={snare} controls loop style={{ marginLeft: "18px" }}/>
            </ListItem>
            <ListItem>
              TR-808 Hats
              <audio src={hats} controls loop style={{ marginLeft: "43px" }}/>
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
            margin="0 0 50px"
            textColor="secondary"
          >
            Kick Sound
          </Heading>

          <CodePane
            lang="javascript"
            theme="light"
            source={`
              const osc = ac.createOscillator();
              const gain = ac.createGain();

              osc.connect(this.gain);
              gain.connect(ac.destination);

              osc.frequency.value = 150;
              gain.gain.value = 1;

              osc.frequency.exponentialRampToValueAtTime(0.01, 0.5);
              gain.gain.exponentialRampToValueAtTime(0.01, 0.5);

              osc.start();
              osc.stop(0.5);
            `}
          />

          <KickNode />
        </Slide>

        <Slide>
          <Heading
            size={3}
            margin="0 0 50px"
            textColor="secondary"
          >
            Snare Sound
          </Heading>

          <CodePane
            lang="javascript"
            theme="light"
            source={`
              const noise = ac.createBufferSource();
              // function that generates random numbers beetween [-1, 1]
              noise.buffer = noiseBuffer();

              const noiseFilter = ac.createBiquadFilter();
              noiseFilter.type = "highpass";
              noiseFilter.frequency.value = 1000;
              noise.connect(noiseFilter);

              const noiseEnvelope = ac.createGain();
              noiseFilter.connect(noiseEnvelope);

              noiseEnvelope.connect(ac.destination);

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
            margin="0 0 50px"
            textColor="secondary"
          >
            Snare Sound
          </Heading>

          <CodePane
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
      </Deck>
    );
  }
}
