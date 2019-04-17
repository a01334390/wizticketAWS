import React from "react";
import NewPlace from '../components/NewPlace'
import PlaceList from '../components/PlaceList'
/* Bring AWS stuff */
import {API, graphqlOperation} from 'aws-amplify'
import {searchPlaces} from '../graphql/queries'

class HomePage extends React.Component {
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
		const result = await API.graphql(graphqlOperation(searchPlaces, {
			filter: {
				or: [
					{name: {match: this.state.searchTerm}},
					{description: {match: this.state.searchTerm}},
					{owner: {match: this.state.searchTerm}}
				]
			}
		}))
		this.setState({searchResults: result.data.searchPlaces.items, isSearching: false})
		console.log(result)
	  } catch(err){
		console.error(err)
	  }
  }
  render() {
    return (
	<>
		<NewPlace
		handleSearch = {this.handleSearch}
		isSearching = {this.state.isSearching}
		searchTerm={this.state.searchTerm}
		handleSearchChange={this.handleSearchChange} 
		handleClearSearch={this.handleClearSearch}/>
		<PlaceList searchResults={this.state.searchResults}/>
	</>)
  }
}

export default HomePage;