import React from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Notification } from 'element-react'
/* Receive the mutation */
import { API, graphqlOperation } from 'aws-amplify'
import { createPlace } from '../graphql/mutations'
/* Receive the cntext */
import { UserContext } from '../App'
class NewPlace extends React.Component {
	state = {
		addPlaceDialog: false,
		name: "",
		description: "",
		bookingCost: 0,
		city: "",
		country: "",
		address_line1: "",
		address_state: "",
		address_zip: "",
		/* We need to refactor this ASAP */
		seatconf0cat: "Musgravite",
		seatconf1cat: "Platinum",
		seatconf2cat: "Gold",
		seatconf3cat: "VIP",
		seatconf0pricing: "",
		seatconf1pricing: "",
		seatconf2pricing: "",
		seatconf3pricing: "",
		seatconf0capacity: "",
		seatconf1capacity: "",
		seatconf2capacity: "",
		seatconf3capacity: "",
		owner: ""
	};

	handleAddPlace = async user => {
		try {
			this.setState({ addPlaceDialog: false })
			/* Generate the seating conf data */
			let seatconf = []
			const sc0 = { category: this.state.seatconf0cat, pricing: this.state.seatconf0pricing, capacity: this.state.seatconf0capacity }
			const sc1 = { category: this.state.seatconf1cat, pricing: this.state.seatconf1pricing, capacity: this.state.seatconf1capacity }
			const sc2 = { category: this.state.seatconf2cat, pricing: this.state.seatconf2pricing, capacity: this.state.seatconf2capacity }
			const sc3 = { category: this.state.seatconf3cat, pricing: this.state.seatconf3pricing, capacity: this.state.seatconf3capacity }
			seatconf.push(sc0, sc1, sc2, sc3)
			console.log(seatconf)
			const input = {
				name: this.state.name,
				description: this.state.description,
				bookingCost: this.state.bookingCost,
				address: {
					city: this.state.city,
					country: this.state.country,
					address_line1: this.state.address_line1,
					address_state: this.state.address_state,
					address_zip: this.state.address_zip
				},
				owner: user.username,
				seatingConfiguration: seatconf
			}
			const result = await API.graphql(graphqlOperation(createPlace, { input }))
			Notification.success({
				title: "Success",
				message: `Created place: id ${result.data.createPlace.id}`
			})

			this.setState({ name: "", description: "", bookingCost: 0, city: "", country: "", address_line1: "", address_state: "", address_zip: "" })

		} catch (err) {
			Notification.error({
				title: "Error",
				message: `${err.errors[0].message || "Error adding Place"}`
			})
		}
	}

	render() {
		return (
			<UserContext.Consumer>
				{({ user }) => <>
					<div className="market-header">
						<h1 className="market-title">
							Create your Event Place
				<Button type="text" icon="edit" className="market-title-button" onClick={() => this.setState({ addPlaceDialog: true })} />
						</h1>
						{/** Elastic Search */}
						<Form inline={true} onSubmit={this.props.handleSearch}>
							<Form.Item>
								<Input 
									placeholder="Search Places..." 
									icon="circle-cross" 
									onIconClick={this.props.handleClearSearch}
									onChange={this.props.handleSearchChange} 
									value={this.props.searchTerm}/>
							</Form.Item>
							<Form.Item>
								<Button 
									type="info" 
									icon="search" 
									onClick={this.props.handleSearch}
									loading={this.props.isSearching}>
									Search
							</Button>
							</Form.Item>
						</Form>
					</div>
					{/** Creation Dialog */}
					<Dialog title="Create New Event Place" visible={this.state.addPlaceDialog} onCancel={() => this.setState({ addPlaceDialog: false })} size="large" customClass="dialog">
						<Dialog.Body>
							<Form labelPosition="top">
								<Form.Item label="Add Place Name">
									<Input placeholder="Place Name" trim={true} onChange={name => this.setState({ name })} value={this.state.name} />
								</Form.Item>
								<Form.Item label="Add Place Description">
									<Input placeholder="Place Description" trim={true} onChange={description => this.setState({ description })} value={this.state.description} />
								</Form.Item>
								<Form.Item label="Add Booking Price">
									<Input type="number" icon="plus" placeholder="Price ($USD)" trim={true} onChange={bookingCost => this.setState({ bookingCost })} value={this.state.bookingCost} />
								</Form.Item>
								<Form.Item label="Add Place Address">
									<Input placeholder="City" trim={true} onChange={city => this.setState({ city })} value={this.state.city} />
									<Input placeholder="Country" trim={true} onChange={country => this.setState({ country })} value={this.state.country} />
									<Input placeholder="Address Line 1" trim={true} onChange={address_line1 => this.setState({ address_line1 })} value={this.state.address_line1} />
									<Input placeholder="Address State" trim={true} onChange={address_state => this.setState({ address_state })} value={this.state.address_state} />
									<Input placeholder="Address ZIP" trim={true} onChange={address_zip => this.setState({ address_zip })} value={this.state.address_zip} />
								</Form.Item>
								<Form.Item label="Add Musgravite Seating information">
									<Input placeholder="Capacity" type="number" onChange={seatconf0capacity => this.setState({ seatconf0capacity })} value={this.state.seatconf0capacity} />
									<Input placeholder="Pricing" type="number" onChange={seatconf0pricing => this.setState({ seatconf0pricing })} value={this.state.seatconf0pricing} />
								</Form.Item>
								<Form.Item label="Add Platinum Seating information">
									<Input placeholder="Capacity" type="number" onChange={seatconf1capacity => this.setState({ seatconf1capacity })} value={this.state.seatconf1capacity} />
									<Input placeholder="Pricing" type="number" onChange={seatconf1pricing => this.setState({ seatconf1pricing })} value={this.state.seatconf1pricing} />
								</Form.Item>
								<Form.Item label="Add Gold Seating information">
									<Input placeholder="Capacity" type="number" onChange={seatconf2capacity => this.setState({ seatconf2capacity })} value={this.state.seatconf2capacity} />
									<Input placeholder="Pricing" type="number" onChange={seatconf2pricing => this.setState({ seatconf2pricing })} value={this.state.seatconf2pricing} />
								</Form.Item>
								<Form.Item label="Add VIP Seating information">
									<Input placeholder="Capacity" type="number" onChange={seatconf3capacity => this.setState({ seatconf3capacity })} value={this.state.seatconf3capacity} />
									<Input placeholder="Pricing" type="number" onChange={seatconf3pricing => this.setState({ seatconf3pricing })} value={this.state.seatconf3pricing} />
								</Form.Item>


							</Form>
						</Dialog.Body>
						<Dialog.Footer>
							<Button onClick={() => this.setState({ addPlaceDialog: false })}>
								Cancel
				</Button>
							<Button type="primary" disabled={!this.state.name && !this.state.description && !this.state.bookingCost} onClick={() => this.handleAddPlace(user)}>
								Add
				</Button>
						</Dialog.Footer>
					</Dialog>

				</>}
			</UserContext.Consumer>
		)
	}
}

export default NewPlace;