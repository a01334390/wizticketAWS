import React from "react";
/** Stripe Stuff */
import StripeCheckout from 'react-stripe-checkout'

/** Element UI */
import {Notification,Message} from 'element-react'

/** AWS Stuff */
import {API} from 'aws-amplify'

const stripeConfig = {
	currency: "MXN",
	publishableAPIKey: "pk_test_pUwXaYwXsdJM9MDQupyDvg6F"
}

const BuyTickets = ({tickets, user}) => {

	const handleCharge = async token => {
		try{
			const result = await API.post('ticketlambda','/charge',{
				body: {
					token,
					charge: {
						currency: stripeConfig.currency,
						amount: tickets.reduce(function(a,b){return a.value + b.value})*100,
						description: tickets.length+"x Tickets"
					}
				}
			})
			console.log({result})
		}catch(err){
			Notification({
				title: "Error",
				message: "Couldn't process your payment, please try again",
				type: "error"
			})
		}
	}

		return (
			<StripeCheckout 
				token={handleCharge}
				currency={stripeConfig.currency} 
				stripeKey={stripeConfig.publishableAPIKey}
				email={user.attributes.email}
				name={tickets.length+"x Tickets"}
				amount={tickets.reduce(function(a,b){return a.value + b.value})*100}
				shippingAddress={false}
				billingAddress={false}
				locale="auto"
				allowRememberMe={false}
				/>
		)
}

export default BuyTickets