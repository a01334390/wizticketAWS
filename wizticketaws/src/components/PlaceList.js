import React from "react";
import { Loading, Card, Icon } from "element-react";
import { Link } from 'react-router-dom'
/* Queries from GraphQL */
import { graphqlOperation } from 'aws-amplify'
import { Connect } from 'aws-amplify-react'
import { listPlaces } from '../graphql/queries'
/* GraphQL subscription */
import {onCreatePlace} from '../graphql/subscriptions'
/* Import others */
import Error from './Error'

const PlaceList = () => {

	const onNewPlace = (prevQuery,newData) => {
		let updatedQuery = {...prevQuery}
		const updatedMarketList = [
			newData.onCreatePlace,
			...prevQuery.listPlaces.items
		]
		updatedQuery.listPlaces.items = updatedMarketList
		return updatedQuery
	}

	return (
		<Connect subscription={graphqlOperation(onCreatePlace)}
				 onSubscriptionMsg = {onNewPlace}
				 query={graphqlOperation(listPlaces)}>
			{({ data, loading, errors }) => {
				if (errors.length > 0) {
					return <Error errors={errors} />
				}
				if (loading || !data.listPlaces) {
					return <Loading fullscreen={true} />
				}
				console.log(data)
				return (
					<>
						{data.listPlaces.items.map(place => (
							<div key={place.id} className="my-2">
								<Card bodyStyle={{
									padding: "0.7em",
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between"
								}}>
									<div>
										<span className="flex">
											<Link className="link" to={`/place/${place.id}`}>
												{place.name}
											</Link>
											<span style={{ color: 'var(--darkAmazonOrange)' }}>
												{place.wizevents.length}
											</span>
											<img src="https://icon.now.sh/musicNote/f60" alt="Check Now" />
										</span>
										<div style={{color: "var(--lightSquidInk)"}}>
											<b>Owner</b> {place.owner || "System Defined"}
										</div>
										{place.description}
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

export default PlaceList;