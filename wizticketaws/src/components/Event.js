import React from 'react'
//prettier-ignore
import {API, graphqlOperation} from 'aws-amplify'
import { S3Image } from 'aws-amplify-react'
import { Notification, Popover, Button, Dialog, Card, Form, Input } from 'element-react'
import {Link} from 'react-router-dom'
import { UserContext } from '../App'

import {updateWizEvent, deleteWizEvent} from '../graphql/mutations'

class Event extends React.Component {
	state = {
		updatedEventDialog: false,
		deleteProductDialog: false,
		name: '',
		description: '',
		validUntil: '',
		ticketsLeft : 0
	}

	componentDidMount = () => {
		const {wevent} = this.props
		var ticketsLeft = 0
		for(var i = 0; i < wevent.tickets.items.length; i++){
			if(wevent.tickets.items[i].owner === null){
				ticketsLeft++
			}
		}
		this.setState({
			name: wevent.name,
			description: wevent.description,
			validUntil: wevent.validUntil,
			ticketsLeft
		})
		
	}

	handleDeleteEvent = async eventId => {
		try{
			this.setState({deleteProductDialog: false})
			const input = {
				id: eventId
			}
			//eslint-disable-next-line
			await API.graphql(graphqlOperation(deleteWizEvent, {input}))
			Notification({
				title: "Success",
				message: "Event"+eventId+" successfully deleted!",
				type: "success",
				duration: 4000
			})

		}catch(err){
			Notification({
				title: "Error",
				message: "Failed to delete the event: "+eventId,
				type: "success",
				duration: 4000
			})
		}
		setTimeout(()=> window.location.reload(),4000)
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
				type: "success"
			})
		}catch(err){
			Notification({
				title: "Error",
				message: "Something happened",
				type: "error"
			})
		}
	}

	render() {
		const { wevent } = this.props
		const {ticketsLeft} = this.state
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
										<Link className="link" to={`/selection/${wevent.id}`}>
										<Button type="success" disabled={ticketsLeft === 0} className="m-1">
												{ticketsLeft === 0 ? "Sold out" : "Buy Tickets"}
											</Button>
										</Link>
										</>
									)}
								</div>
								<div className="text-right">
									<span className="mx-1">
										{ticketsLeft} Tickets left
									</span>
								</div>
							</Card>
							{/** Update / Delete Event Buttons */}
							<div className="text-center">
								{isOwner && (
									<>
										<Button type="warning" icon="edit" className="m-1" onClick={() => this.setState({ updatedEventDialog: true })} />
										<Popover placement="top" width="160" trigger="click" visible={this.state.deleteProductDialog} content={
											<>
												<p>Do you want to delete this event?</p>
												<div className="text-right">
													<Button size="mini" type="text" className="m-1" onClick={()=> this.setState({deleteProductDialog: false})}>Cancel</Button>
													<Button type="primary" size="mini" className="m-1" onClick={()=>this.handleDeleteEvent(wevent.id)}>Confirm</Button>
												</div>
											</>
										}>
											<Button type="danger" icon="delete" onClick={() => this.setState({ deleteProductDialog: true })} />
										</Popover>
										
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