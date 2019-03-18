import React from 'react'
//prettier-ignore
import {API, graphqlOperation} from 'aws-amplify'
import { S3Image } from 'aws-amplify-react'
import { Notification, Popover, Button, Dialog, Card, Form, Input } from 'element-react'
import { UserContext } from '../App'
import BuyTickets from '../components/BuyTickets'

import {updateWizEvent} from '../graphql/mutations'

class Event extends React.Component {
	state = {
		updatedEventDialog: false,
		name: '',
		description: '',
		validUntil: ''
	}

	componentDidMount = () => {
		const {wevent} = this.props
		this.setState({
			name: wevent.name,
			description: wevent.description,
			validUntil: wevent.validUntil
		})
	}

	onHandleUpdateEvent = async (id) => {
		try {
			this.setState({updatedEventDialog: false})
			const {name,description,validUntil} = this.state
			const input = {
				id: id,
				name,
				description,
				validUntil
			}
			//eslint-disable-next-line
			const result = await API.graphql(graphqlOperation(updateWizEvent,{input}))
			Notification({
				title: "Success",
				message: "Event"+id+" successfully updated!",
				type: "success",
				duration: 4000
			})
		}catch(err){
			Notification({
				title: "Error",
				message: "Something happened",
				type: "error",
				duration: 4000
			})
		}
		setTimeout(()=> window.location.reload(),4000)
	}

	render() {
		const { wevent } = this.props
		return (
			<UserContext.Consumer>
				{({ user }) => {

					const isOwner = user.username === wevent.owner

					return (
						<div className="card-container">
							<Card
								bodyStyle={{ padding: 0, minWidth: "200px" }}>
								{wevent.pictures != null ? (
									<S3Image
										imgKey={wevent.pictures.key}
										theme={{
											photoImg: { maxWidth: "100%", maxHeight: "100%" }
										}}
									/>
								) : (<></>)}
								<div className="card-body">
									<h3 className="m-0">{wevent.name}</h3>
									<p>{wevent.description}</p>

									<span className="mx-1">
										Created by: {wevent.owner}
										<br />
										Tickets for: {wevent.validUntil}
									</span>
									{!isOwner && (
										<>
											<BuyTickets />
										</>
									)}
								</div>
								<div className="text-right">
									<span className="mx-1">
										{wevent.tickets.items.length} Tickets left
									</span>
								</div>
							</Card>
							{/** Update / Delete Event Buttons */}
							<div className="text-center">
								{isOwner && (
									<>
										<Button type="warning" icon="edit" className="m-1" onClick={() => this.setState({ updatedEventDialog: true })} />
										<Button type="danger" icon="delete" />
									</>
								)}
							</div>
							{/** Update Event Dialog */}
							<Dialog title="Update Event" size="large" customClass="dialog" visible={this.state.updatedEventDialog} onCancel={() => this.setState({ updatedEventDialog: false })}>
								<Dialog.Body>
								<Form labelPosition="top">
									<Form.Item label="Update Event Name">
										<Input placeholder="Event Name" trim={true} onChange={name => this.setState({ name })} value={this.state.name} />
									</Form.Item>
									<Form.Item label="Update Event Description">
										<Input placeholder="Event Description" trim={true} onChange={description => this.setState({ description })} value={this.state.description} />
									</Form.Item>
									<Form.Item label="Update Event Date">
										<Input type="date" icon="plus" placeholder="Price ($USD)" trim={true} onChange={validUntil => this.setState({ validUntil })} value={this.state.validUntil} />
									</Form.Item>
								</Form>
								</Dialog.Body>
								<Dialog.Footer>
									<Button onClick={()=>this.setState({updatedEventDialog: false})}>Cancel</Button>
									<Button type="primary" onClick={()=> this.onHandleUpdateEvent(wevent.id)}>Update</Button>
								</Dialog.Footer>
							</Dialog>
						</div>
					)
				}}
			</UserContext.Consumer>
		)
	}
}

export default Event