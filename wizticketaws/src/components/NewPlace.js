import React from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react'
/* Receive the mutation */
import { API, graphqlOperation } from 'aws-amplify'
import { createPlace } from '../graphql/mutations'

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
		address_zip: ""

	};

	handleAddPlace = async () => {
		try {
			this.setState({ addPlaceDialog: false })
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
				}
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
			console.log(err)
		}
	}

	render() {
		return (
			<>
				<div className="market-header">
					<h1 className="market-title">
						Create your Event Place
				<Button type="text" icon="edit" className="market-title-button" onClick={() => this.setState({ addPlaceDialog: true })} />
					</h1>
				</div>
				{/** Creation Dialog */}
				<Dialog title="Create New Event Place" visible={this.state.addPlaceDialog} onCancel={() => this.setState({ addPlaceDialog: false })} size="large" customClass="dialog">
					<Dialog.Body>
						<Form labelPosition="top">
							<Form.Item label="Add Place Name">
								<Input placeholder="Place Name" trim={true} onChange={name => this.setState({ name })} value={this.state.name} />
								<Input placeholder="Place Description" trim={true} onChange={description => this.setState({ description })} value={this.state.description} />
								<Input type= "number" icon="plus" placeholder="Price ($USD)" trim={true} onChange={bookingCost => this.setState({ bookingCost })} value={this.state.bookingCost} />
								<Input placeholder="City" trim={true} onChange={city => this.setState({ city })} value={this.state.city} />
								<Input placeholder="Country" trim={true} onChange={country => this.setState({ country })} value={this.state.country} />
								<Input placeholder="Address Line 1" trim={true} onChange={address_line1 => this.setState({ address_line1 })} value={this.state.address_line1} />
								<Input placeholder="Address State" trim={true} onChange={address_state => this.setState({ address_state })} value={this.state.address_state} />
								<Input placeholder="Address ZIP" trim={true} onChange={address_zip => this.setState({ address_zip })} value={this.state.address_zip} />
							</Form.Item>
						</Form>
					</Dialog.Body>
					<Dialog.Footer>
						<Button onClick={() => this.setState({ addPlaceDialog: false })}>
							Cancel
				</Button>
						<Button type="primary" disabled={!this.state.name && !this.state.description && !this.state.bookingCost} onClick={this.handleAddPlace}>
							Add
				</Button>
					</Dialog.Footer>
				</Dialog>

			</>
		)
	}
}

export default NewPlace;