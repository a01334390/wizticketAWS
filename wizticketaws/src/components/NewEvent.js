import React from 'react';
// prettier-ignore
import { Storage, Auth, API, graphqlOperation } from 'aws-amplify'
import { updateWizEvent , createWizEvent, createTicket } from '../graphql/mutations'
import { PhotoPicker } from 'aws-amplify-react'
import aws_exports from '../aws-exports'
import { Form, Button, Input, Notification, Progress } from 'element-react'

var initialstate = {
	name: "",
	description: "",
	user: "",
	validUntil: "",
	place: "",
	imagePreview: "",
	image: "",
	isUploading: false,
	percentUploaded: 0
};

class NewEvent extends React.Component {
	state = {
		...initialstate
	};

	componentDidMount = () => {
		this.setState({ place: this.props.place, user: this.props.user })
	}

	handleCreateTickets = async (wevent) => {
		for(var i = 0; i < this.state.place.seatingConfiguration.length; i++){
			for(var x=0; x < this.state.place.seatingConfiguration[i].capacity;x++){
				const input = {
					ticketWizeventId : wevent.data.createWizEvent.id,
					category: this.state.place.seatingConfiguration[i].category,
					value: this.state.place.seatingConfiguration[i].pricing,
					seat: x+1
				}
				await API.graphql(graphqlOperation(createTicket,{input}))
				console.log("added ticket:",input)
			}
		}
	}

	handleAddEvent = async () => {
		try {
			this.setState({ isUploading: true })

			const visibility = "public"
			const { identityId } = await Auth.currentCredentials()
			const filename = `/${visibility}/${identityId}/${Date.now()}-${this.state.image.name}`
			const uploadedFile = await Storage.put(filename, this.state.image.file, {
				contentType: this.state.image.type,
				progressCallback: progress => {
					console.log(`Uploaded: ${progress.loaded}/${progress.total}`)
					const percentUploaded = Math.round((progress.loaded / progress.total) * 100)
					this.setState({percentUploaded})
				}
			})
			
			const file = {
				key: uploadedFile.key,
				bucket: aws_exports.aws_user_files_s3_bucket,
				region: aws_exports.aws_project_region
			}
			const input = {
				name: this.state.name,
				description: this.state.description,
				owner: this.state.user.username,
				createdAt: Date.now().toString(),
				validUntil: this.state.validUntil,
				pictures: file
			}
			const result = await API.graphql(graphqlOperation(createWizEvent, { input }))
			console.log('created event', result)
			const oresult = await API.graphql(graphqlOperation(updateWizEvent, {input: {id: result.data.createWizEvent.id, wizEventPlaceId: this.state.place.id}}))
			console.log('added place', oresult)
			await this.handleCreateTickets(result)
			Notification({
				title: "Success",
				message: "Event Successfully created!",
				type: 'success'
			})
			this.setState({ ...initialstate })
		} catch (error) {
			console.log('error creating event',error)
			Notification({
				title: "Error",
				message:  error.errors[0].message,
				type: 'error'
			})
		}

		
	}

	render() {
		const { imagePreview, isUploading, percentUploaded} = this.state

		return (
			<div className="flex-center">
				<h2 className="header"> Add new Event </h2>
				<div>
					<Form className="market-header">
						<Form.Item label="Add Event Name">
							<Input placeholder="Event Name" trim={true} onChange={name => this.setState({ name })} value={this.state.name} />
						</Form.Item>
						<Form.Item label="Add Event Description">
							<Input placeholder="Event Description" trim={true} onChange={description => this.setState({ description })} value={this.state.description} />
						</Form.Item>
						<Form.Item label="Add Event Date">
							<Input type="date" icon="plus" placeholder="Price ($USD)" trim={true} onChange={validUntil => this.setState({ validUntil })} value={this.state.validUntil} />
						</Form.Item>
						{imagePreview && (
							<img className="image-preview"
								src={imagePreview}
								alt="Product Preview" />
						)}
						{percentUploaded > 0 && (
							<Progress 
								type="circle"
								status="success"
								className="progress"
								percentage={percentUploaded}
							/>
						)}
						<PhotoPicker
							title="Event Image"
							preview="hidden"
							onLoad={url => this.setState({ imagePreview: url })}
							onPick={file => this.setState({ image: file })}
							theme={{
								formContainer: {
									margin: 0,
									padding: '0.8em'
								},
								formSection: {
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center'
								},
								sectionHeader: {
									padding: '0.2em',
									color: "var(--darkAmazonOrange)"
								},
								sectionBody: {
									margin: 0,
									width: "250px"
								},

								photoPickerButton: {
									display: "none"
								}
							}}
						/>
						<Form.Item>
							<Button loading={isUploading} disabled={!this.state.image || !this.state.description || !this.state.name || !this.state.validUntil || isUploading} type="primary" onClick={this.handleAddEvent}>
							{isUploading ? 'Uploading...' : 'Add event'}
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		)
	}
}

export default NewEvent