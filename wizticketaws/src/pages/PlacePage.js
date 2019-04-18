import React from "react";
import { Link } from 'react-router-dom'
/* GraphQL API */
import { API, graphqlOperation } from 'aws-amplify'
/* Element UI */
import { Loading, Tabs, Icon } from 'element-react'
/* Component */
import NewEvent from '../components/NewEvent'
import Event from '../components/Event'
// import Event from '../components/Event'
import {onCreateWizEvent, onDeleteWizEvent, onUpdateWizEvent} from '../graphql/subscriptions'

const getPlace = `query GetPlace($id: ID!) {
  getPlace(id: $id) {
    id
    name
    description
    bookingCost
    address {
      city
      country
      address_line1
      address_state
      address_zip
    }
    seatingConfiguration {
      category
      capacity
      pricing
    }
    owner
    wizevents {
      items {
        id
        name
        description
        createdAt
        owner
        pictures {
          key
        }
        tickets {
          items {
            id
            category 
            seat 
            value
            owner {
              id
            } 
          }
        }
        validUntil
      }
      nextToken
    }
    pictures {
      bucket
      region
      key
    }
  }
}
`;

class PlacePage extends React.Component {
  state = {
    place: null,
    isLoading: true,
    isPlaceOwner: false
  };

  componentDidMount = () => {
    this.handleGetMarket()
    this.createWizEventListener = API.graphql(graphqlOperation(onCreateWizEvent))
    .subscribe({
      next: weventData => {
        const createdEvent = weventData.value.data.onCreateWizEvent
        const prevEvents = this.state.place.wizevents.items.filter(
          item => item.id !== createdEvent.id
        )
        const updatedEvents = [createdEvent,...prevEvents]
        const place = {...this.state.place}
        place.wizevents.items = updatedEvents
        this.setState({place})
      }
    })

    this.updateWizEventListener = API.graphql(graphqlOperation(onUpdateWizEvent))
    .subscribe({
      next: weventData => {
        const updatedEvent = weventData.value.data.onUpdateWizEvent
        const updatedEventIndex = this.state.place.wizevents.items.findIndex(
          item => item.id === updatedEvent.id
        )
        const updatedEvents = [
          ...this.state.place.wizevents.items.slice(0,updatedEventIndex),
          updatedEvent,
          ...this.state.place.wizevents.items.slice(updatedEventIndex + 1)
        ]
        const place = {...this.state.place}
        place.wizevents.items = updatedEvents
        this.setState({place})
      }
    })

    this.deleteWizEventListener = API.graphql(graphqlOperation(onDeleteWizEvent))
    .subscribe({
      next: weventData => {
        const createdEvent = weventData.value.data.onDeleteWizEvent
        const updatedEvents = this.state.place.wizevents.items.filter(
          item => item.id !== createdEvent.id
        )
        const place = {...this.state.place}
        place.wizevents.items = updatedEvents
        this.setState({place})
      }
    })
  }

  componentWillUnmount = () => {
    this.createWizEventListener.unsubscribe()
    this.updateWizEventListener.unsubscribe()
    this.deleteWizEventListener.unsubscribe()
  }

  handleGetMarket = async () => {
    const input = {
      id: this.props.placeId
    }
    const result = await API.graphql(graphqlOperation(getPlace, input))
    this.setState({ place: result.data.getPlace, isLoading: false }, () => {
      this.checkMarketOwner()
      this.checkEmailVerified()
    })
  }

  checkMarketOwner = () => {
    const { user } = this.props
    const { place } = this.state
    if (user) {
      this.setState({ isPlaceOwner: user.username === place.owner })
    }
  }

  render() {

    const { place, isLoading, isPlaceOwner } = this.state
    return isLoading ? (<Loading fullscreen={true} />) : (
      <>
        {/** Back Button */}
        <Link className="link" to="/">
          Back to Place List
        </Link>
        <span className="items-center pt-2">
          <h2 className="mb-mr">
            {place.name}
          </h2> - {place.owner}
        </span>
        {/** Seating configuration */}
        <div className="items-center pt-2">
          <span style={{ color: 'var(--lightSquidInk)', paddingBottom: '1em' }}>
            <Icon name="document" className="icon" />
            {place.description}
          </span>
        </div>
        {/* CRUD OPERATIONS */}
        <Tabs type="border-card" value={isPlaceOwner ? "1" : "2"}>
          {isPlaceOwner && (
            <Tabs.Pane label={
              <>
                <Icon name="plus" className="icon" />
                Add Event
              </>
            } name="1">
              <NewEvent place={this.state.place} user={this.props.user} />
            </Tabs.Pane>
          )}

          {/* Events List*/}
          <Tabs.Pane label={
            <>
              <Icon name="menu" className="icon" />
              All Events ({place.wizevents.items.length})
            </>
          } name="2">

            <div className="event-list">
              {place.wizevents.items.map(wev => (
                <Event key={wev.id} wevent={wev} />
              ))}
            </div>

          </Tabs.Pane>
        </Tabs>
      </>
    )
  }
}

export default PlacePage;