import React, { Component } from 'react';
import { withAuthenticator,AmplifyTheme } from 'aws-amplify-react'
import logo from './logo.svg';
import './App.css';

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme.navBar,
    backgroundColor: "#ffc0b"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--amazonOrange)"
  },
  sectionBody: {
    ...AmplifyTheme.sectionBody,
    padding: "5px"
  }, 
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--squidInk)"
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default withAuthenticator(App,true);

