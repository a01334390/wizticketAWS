import React from "react";
import NewPlace from '../components/NewPlace'
import PlaceList from '../components/PlaceList'

class HomePage extends React.Component {
  state = {};

  render() {
    return (
	<>
		<NewPlace/>
		<PlaceList/>
	</>)
  }
}

export default HomePage;