import React from "react";
/** Stripe Stuff */
import StripeCheckout from 'react-stripe-checkout'

/** Element UI */
import {Notification,Message} from 'element-react'

const stripeConfig = {
	currency: "MXN",
	publishableAPIKey: "pk_test_pUwXaYwXsdJM9MDQupyDvg6F"
}

const BuyTickets = ({tickets, user}) => {


		return (
			<StripeCheckout 
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