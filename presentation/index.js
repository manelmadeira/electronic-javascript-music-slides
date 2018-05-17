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
  CodePane
} from "spectacle";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");

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
      </Deck>
    );
  }
}

/*
*/
