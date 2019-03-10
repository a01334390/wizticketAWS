import React from "react";
// prettier-ignore
import { Form, Button, Dialog, Input, Notification, Select } from 'element-react'
/* Receive the mutation */
import { API, graphqlOperation } from 'aws-amplify'
import { createWizEvent } from '../graphql/mutations'
import { listPlaces } from '../graphql/queries'
/* Receive the cntext */
import { UserContext } from '../App'
class NewEvent extends React.Component {
	state = {
		addEventDialog: false,
		name: "",
		description: "",
		owner: "",
		validUntil: "",
		place: "",
		places: [],
		options: []
	};

	componentDidMount = async () => {
		const result = await API.graphql(graphqlOperation(listPlaces))
		this.setState({ places: result.data.listPlaces.items })
	}

	handleAddEvent = async user => {
		try {
			console.log(this.state.place)
			this.setState({ addEventDialog: false })
			/* Generate the seating conf data */
			const input = {
				name: this.state.name,
				description: this.state.description,
				owner: user.username,
				validUntil: this.state.validUntil,
				// place: this.state.place,
				createdAt: new Date()
			}
			const result = await API.graphql(graphqlOperation(createWizEvent, { input }))
			Notification.success({
				title: "Success",
				message: `Created Event: id ${result.data.createWizEvent.id}`
			})

			this.setState({ name: "", description: "", owner: "", validUntil: "", place: "" })

		} catch (err) {
			Notification.error({
				title: "Error",
				message: `${err.errors[0].message || "Error adding Event"}`
			})
		}
	}

	handleFilterPlaces = query => {
		const options = this.state.places
			.map(place => ({ name: place.name, id: place.id , data: place}))
			.filter(place => place.name.toLowerCase().includes(query.toLowerCase()));
		this.setState({ options });
	}

	render() {
		return (
			<UserContext.Consumer>
				{({ user }) => <>
					<div className="market-header">
						<h1 className="market-title">
							Create your Event
				<Button type="text" icon="edit" className="market-title-button" onClick={() => this.setState({ addEventDialog: true })} />
						</h1>
						{/** Elastic Search */}
						<Form inline={true} onSubmit={this.props.handleSearch}>
							<Form.Item>
								<Input
									placeholder="Search Events..."
									icon="circle-cross"
									onIconClick={this.props.handleClearSearch}
									onChange={this.props.handleSearchChange}
									value={this.props.searchTerm} />
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
					<Dialog title="Create New Event" visible={this.state.addEventDialog} onCancel={() => this.setState({ addEventDialog: false })} size="large" customClass="dialog">
						<Dialog.Body>
							<Form labelPosition="top">
								<Form.Item label="Add Event Name">
									<Input placeholder="Event Name" trim={true} onChange={name => this.setState({ name })} value={this.state.name} />
								</Form.Item>
								<Form.Item label="Add Event Description">
									<Input placeholder="Event Description" trim={true} onChange={description => this.setState({ description })} value={this.state.description} />
								</Form.Item>
								<Form.Item label="Add Event Date">
									<Input type="date" icon="plus" placeholder="Price ($USD)" trim={true} onChange={validUntil => this.setState({ validUntil })} value={this.state.validUntil} />
								</Form.Item>
								<Form.Item label="Select an Event Place">
									<Select
										multiple={false}
										filterable={true}
										placeholder="Event Places"
										onChange={selectedPlace => this.setState({ place: selectedPlace })}
										remoteMethod={this.handleFilterPlaces}
										remote={true}>
										{this.state.options.map(option => (
											<Select.Option key={option.id} label={option.name} value={option.data} />
										))}

									</Select>
								</Form.Item>
							</Form>
						</Dialog.Body>
						<Dialog.Footer>
							<Button onClick={() => this.setState({ addEventDialog: false })}>
								Cancel
				</Button>
							<Button type="primary" disabled={!this.state.name && !this.state.description && !this.state.validUntil} onClick={() => this.handleAddEvent(user)}>
								Add
				</Button>
						</Dialog.Footer>
					</Dialog>

				</>}
			</UserContext.Consumer>
		)
	}
}

export default NewEvent;