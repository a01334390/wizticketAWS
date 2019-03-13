import React from "react";
import NewEvent from '../components/NewEvent'
import EventList from '../components/EventList'
/* Bring AWS stuff */
import {API, graphqlOperation} from 'aws-amplify'
import {searchWizEvents} from '../graphql/queries'

class ArtistPage extends React.Component {
  state = {
	  searchTerm: "",
	  searchResults: [],
	  isSearching: false
  };

  handleSearchChange = searchTerm => this.setState({searchTerm})
  handleClearSearch = () => this.setState({searchTerm: "", searchResults: []})
  handleSearch = async event => {
	  try{
		event.preventDefault()
		this.setState({isSearching: true})
		const result = await API.graphql(graphqlOperation(searchWizEvents, {
			filter: {
				or: [
					{name: {match: this.state.searchTerm}},
					{description: {match: this.state.searchTerm}},
					{owner: {match: this.state.searchTerm}}
				]
			}
		}))
		this.setState({searchResults: result.data.searchWizEvents.items, isSearching: false})
		console.log(result)
	  } catch(err){
		console.error(err)
	  }
  }
  render() {
    return (
	<>
		<NewEvent
		handleSearch = {this.handleSearch}
		isSearching = {this.state.isSearching}
		searchTerm={this.state.searchTerm}
		handleSearchChange={this.handleSearchChange} 
		handleClearSearch={this.handleClearSearch}/>
		<EventList searchResults={this.state.searchResults}/>
	</>)
  }
}

export default ArtistPage;