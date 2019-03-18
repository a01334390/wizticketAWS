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

  componentDidMount = async () => {
    this.handleGetMarket()
  }

  handleGetMarket = async () => {
    const input = {
      id: this.props.placeId
    }
    const result = await API.graphql(graphqlOperation(getPlace, input))
    this.setState({ place: result.data.getPlace, isLoading: false }, () => {
      this.checkMarketOwner()
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
    console.log(place)
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