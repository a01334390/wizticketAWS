import React from "react";
/** Stripe Stuff */
import StripeCheckout from 'react-stripe-checkout'

/** Element UI */
import { Notification, Message } from 'element-react'

/** AWS Stuff */
import { API } from 'aws-amplify'

const stripeConfig = {
	currency: "MXN",
	publishableAPIKey: "pk_test_pUwXaYwXsdJM9MDQupyDvg6F"
}

const BuyTickets = ({ tickets, user, amount}) => {
	console.log(amount)
	const handleCharge = async token => {
		try {
			const result = await API.post('ticketlambda', '/charge', {
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
			Notification({
				title: "Success",
				message: "Your payment was received correctly",
				type: "success"
			})
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