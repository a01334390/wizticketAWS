import React from "react";
import {Link} from 'react-router-dom'
/* GraphQL API */
import {API, graphqlOperation} from 'aws-amplify'
import {getPlace} from '../graphql/queries'
/* Element UI */
import {Loading, Tabs, Icon} from 'element-react'

class PlacePage extends React.Component {
  state = {
    place : null,
    isLoading : true,
    isPlaceOwner: false
  };

  componentDidMount(){
    this.handleGetMarket()
  }

  handleGetMarket = async () =>{
    const input = {
      id: this.props.placeId
    }
    const result = await API.graphql(graphqlOperation(getPlace, input))
    this.setState({place: result.data.getPlace, isLoading: false},()=>{
      this.checkMarketOwner()
    })
  }

  checkMarketOwner = () => {
    const {user} = this.props
    const {place} = this.state
    if(user) {
      this.setState({isPlaceOwner: user.username === place.owner})
    }
  }

  render() {
    const {place, isLoading, isPlaceOwner} = this.state
    return isLoading? (<Loading fullscreen={true}/>) : (
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
          <span style={{color: 'var(--lightSquidInk)', paddingBottom: '1em'}}> 
            <Icon name="document" className="icon"/>
            {place.description}
          </span>
        </div>
        {/* CRUD OPERATIONS */}
        <Tabs type="border-card" value={isPlaceOwner? "1": "2"}>
          {isPlaceOwner && (
            <Tabs.Pane label={
              <>
                <Icon name="plus" className="icon"/>
                Add Event
              </>
            } name="1">
              
            </Tabs.Pane>
          )}

          {/* Events List*/}
          <Tabs.Pane label={
            <>
            <Icon name="menu" className="icon"/>
            Events ({place.wizevents.length})
            </>
          } name="2">

          </Tabs.Pane>
        </Tabs>
      </>
    )
  }
}

export default PlacePage;