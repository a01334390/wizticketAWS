import React from "react";
import { Loading, Card, Icon } from "element-react";
import { Link } from 'react-router-dom'
/* Queries from GraphQL */
import { graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import { listWizEvents } from '../graphql/queries'
/* GraphQL subscription */
import {onCreateWizEvent} from '../graphql/subscriptions'
/* Import others */
import Error from './Error'

const EventList = ({searchResults}) => {

	const onNewEvent = (prevQuery,newData) => {
		let updatedQuery = {...prevQuery}
		const updatedMarketList = [
			newData.onCreateWizEvent,
			...prevQuery.listWizEvents.items
		]
		updatedQuery.listWizEvents.items = updatedMarketList
		return updatedQuery
	}

	return (
		<Connect subscription={graphqlOperation(onCreateWizEvent)}
				 onSubscriptionMsg = {onNewEvent}
				 query={graphqlOperation(listWizEvents)}>
			{({ data, loading, errors }) => {
				if (errors.length > 0) {
					return <Error errors={errors} />
				}
				if (loading || !data.listWizEvents) {
					return <Loading fullscreen={true} />
				}

				const Events = searchResults.length > 0 ? searchResults: data.listWizEvents.items

				return (
					<>
					{searchResults.length > 0 ? (
						<h2 className="text-green">
							<Icon type="success" name="check" className="icon"/>
							{searchResults.length} Results 
						</h2>
					): (
					<h2 className="header">
						<img src="https://icon.now.sh/store_mall_directory/527FFF"
							alt="Store Icon"
							className="large-icon">
						</img>
						Events
					</h2>)}
						{Events.map(Event => (
							<div key={Event.id} className="my-2">
								<Card bodyStyle={{
									padding: "0.7em",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}>
									<div>
										<span className="flex">
											<Link className="link" to={`/event/${Event.id}`}>
												{Event.name}
											</Link>
											<span style={{ color: 'var(--darkAmazonOrange)' }}>
												{Event.tickets.length}
											</span>
											<img src="https://icon.now.sh/musicNote/f60" alt="Check Now" />
										</span>
										<div style={{color: "var(--lightSquidInk)"}}>
											<b>Owner</b> {Event.owner || "System Defined"}
										</div>
										{Event.description}
									</div>
								</Card>
							</div>
						))}
					</>
				)
			}}
		</Connect>
	)
};

export default EventList;