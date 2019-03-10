import React, { Component } from 'react';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react'
import { Auth, Hub } from 'aws-amplify'
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
  state = {
    user: null
  }

  componentDidMount() {
    this.getUserData()
    Hub.listen('auth', this, 'onHubCapsule')
  }

  getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser()
    user ? this.setState({ user }) : this.setState({ user: null })
  }

  onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log('signed in!')
        this.getUserData()
        break;
      case "signUp":
        console.log('signed up!')
        break;
      case "signOff":
        console.log('signed out')
        this.setState({ user: null })
        break;
      default:
        console.log('not supported')
        break;
    }
  }

  render() {
    const { user } = this.state
    return !user ? (<Authenticator theme={theme} />) : <div>App</div>

  }
}

// export default withAuthenticator(App,true);
export default App
