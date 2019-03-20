import React, { Component } from 'react';
import { Authenticator, AmplifyTheme } from 'aws-amplify-react'
import { Router, Route } from 'react-router-dom'
import { API, graphqlOperation, Auth, Hub } from 'aws-amplify'
import {getUser} from './graphql/queries'
import {createUser} from './graphql/mutations'
import './App.css';
import createBrowserHistory from 'history/createBrowserHistory'

/* Pages and components */
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import PlacePage from './pages/PlacePage'
import NavBar from './components/NavBar'
import TicketSelection from './pages/TicketSelection';

/* Context */
export const UserContext = React.createContext()

export const history = createBrowserHistory()

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
        this.registerNewUser(capsule.payload.data)
        break;
      case "signUp":
        console.log('signed up!')
        break;
      case "signOut":
        console.log('signed out')
        this.setState({ user: null })
        break;
      default:
        console.log('not supported')
        break;
    }
  }

  registerNewUser = async signInData => {
    const getUserInput = {
      id: signInData.signInUserSession.idToken.payload.sub
    }
    const {data} = await API.graphql(graphqlOperation(getUser,getUserInput))
    if(!data.getUser) {
      try {
        const registerUserInput = {
          ...getUserInput,
          username: signInData.username,
          email: signInData.signInUserSession.idToken.payload.email,
          registered: true,
          group: 'fan'
        }
        const newUser = await API.graphql(graphqlOperation(createUser, {input: registerUserInput}))
        console.log({newUser})
      } catch(err){
        console.error("Error registering new user",err)
      }
    }
  }

  render() {
    const { user } = this.state
    return !user ? (<Authenticator theme={theme} />) : (
      <UserContext.Provider value={{user}}>
        <Router history={history}>
          <>
            {/** Navigation Bar */}
            <NavBar user={user} handleSignout={this.handleSignout} />
            {/** Event Place Owner Routes */}
            <div className="app-container">
              <Route exact path="/" component={HomePage} />
              <Route path="/profile" component={
                ()=> <ProfilePage user={user}/>} />
              <Route path="/place/:placeId" component={
                ({ match }) => <PlacePage user={user} placeId={match.params.placeId} />
              } />
              {/** Ticketing pages */}
              <Route path="/selection/:eventId" component={
                ({ match }) => <TicketSelection user={user} eventId={match.params.eventId}/>
              }/>
              
            </div>
          </>
        </Router>
      </UserContext.Provider>)
  }
}

// export default withAuthenticator(App,true);
export default App
