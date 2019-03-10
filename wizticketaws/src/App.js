import React, { Component } from 'react';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Auth, Hub } from 'aws-amplify'
import './App.css';

/* Pages and components */
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PlacePage from './pages/PlacePage'
import NavBar from './components/NavBar'

/* Artist Components and Pages */
import ArtistPage from './pages/ArtistPage'

/* Context */
export const UserContext = React.createContext()

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

  handleSignout = async () => {
    try {
      await Auth.signOut()
    } catch (err) {
      console.error("Error signing out user", err)
    }
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
    return !user ? (<Authenticator theme={theme} />) : (
      <UserContext.Provider value={{user}}>
        <Router>
          <>
            {/** Navigation Bar */}
            <NavBar user={user} handleSignout={this.handleSignout} />
            {/** Event Place Owner Routes */}
            <div className="app-container">
              <Route exact path="/" component={HomePage} />
              <Route path="/profile" component={ProfilePage} />
              <Route path="/place/:placeId" component={
                ({ match }) => <PlacePage user={user} placeId={match.params.placeId} />
              } />
              <Route exact path="/artist" component={ArtistPage}/>
              {/* <Route path="/event/:eventId" component={
                ({ match }) => <EventPage user={user} eventId={match.params.eventId} />
              } */}
              />
            </div>
          </>
        </Router>
      </UserContext.Provider>)
  }
}

// export default withAuthenticator(App,true);
export default App
