import React from "react";
/** Stripe Stuff */
import StripeCheckout from 'react-stripe-checkout'

/** Element UI */
import { Notification, Message } from 'element-react'

/** Update ticket owner's */
import {updateTicket} from '../graphql/mutations'

/** AWS Stuff */
import { API, graphqlOperation} from 'aws-amplify'

import {history} from '../App'

const stripeConfig = {
	currency: "MXN",
	publishableAPIKey: "pk_test_pUwXaYwXsdJM9MDQupyDvg6F"
}

const BuyTickets = ({ tickets, user, amount}) => {
	
	const handleCharge = async token => {
		console.log(tickets)
		try {
			const result = await API.post('apif529b0c1', '/charge', {
				body: {
					token,
					charge: {
						currency: stripeConfig.currency,
						amount: amount*100,
						description: tickets.length + "x Tickets"
					},
					email: {
						customerEmail: user.attributes.email
					}
				}
			})
			if(result.charge.status === "succeeded"){
				for(var i = 0; i < tickets.length; i++){
					var input = {
						id: tickets[i].key,
						ticketOwnerId: user.attributes.sub
					}
					const r = await API.graphql(graphqlOperation(updateTicket,{input}))
					console.log(r)
				}
				Notification({
					title: "Success",
					message: "Payment was processed correctly",
					type: "success",
					duration: 3000
				})
				setTimeout(()=>{
					history.push('/')
					Message({
						type: 'info',
						message: 'Check your verified email for order tickets',
						duration: 5000,
						showClose: true
					})
				},3000)
			}
			console.log({ result })
		} catch (err) {
			Notification({
				title: "Error",
				message: "Couldn't process your payment, please try again",
				type: "error"
			})
			console.log({err})
		}
	}

	return (
		<StripeCheckout
			token={handleCharge}
			currency={stripeConfig.currency}
			stripeKey={stripeConfig.publishableAPIKey}
			email={user.attributes.email}
			name={tickets.length + "x Tickets"}
			amount={amount*100}
			shippingAddress={false}
			billingAddress={false}
			locale="auto"
			allowRememberMe={false}
		/>
	)
}

export default BuyTickets