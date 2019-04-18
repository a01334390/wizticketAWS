import React from "react";
import {API, graphqlOperation} from 'aws-amplify'
import {Notification ,Loading, Card } from 'element-react'
import { S3Image } from 'aws-amplify-react'

import {getTicket} from '../graphql/queries'
import {formatOrder} from '../utils/index'

var QRCode = require('qrcode.react');

class TicketValidator extends React.Component {
    state = {
        found: false,
        ticket: {},
        isLoading: true
    }

    componentDidMount = async () => {
        try{
            if (this.props.ticketId !== "") {
                const input = {
                    id: this.props.ticketId
                }
                const result = await API.graphql(graphqlOperation(getTicket, input))
                if(result.data.getTicket !== null){
                    this.setState({
                        found: true,
                        ticket: result.data.getTicket,
                        isLoading: false
                    })
                }
            }
        }catch(err){
            Notification({
                title: "Error",
                message: "An error occurred while connecting to the database",
                type: "error"
            })
            this.setState({isLoading : false})
        }
    }

    render(){
        const {ticket,found,isLoading} = this.state

        return !found ? (
            <>
            {isLoading && <Loading fullscreen="true"></Loading>}
            "Not found"
            </>
        ) : (<>
            {isLoading && <Loading fullscreen="true"></Loading>}
            <div className="mb-1" key={ticket.id}>
                <Card>
                  <S3Image
                    imgKey={ticket.wizevent.pictures.key}
                    theme={{
                      photoImg: { maxWidth: "100%", maxHeight: "10%" }
                    }}
                  />
                  <pre>
                    <p>Ticket id: {ticket.id}</p>
                    <p>Category: {ticket.category}</p>
                    <p>Seating: {ticket.seat}</p>
                    <p>Price: ${ticket.value} MXN</p>
                    <p>Owner: {ticket.owner.username}</p>
                    <p>For the event:  {ticket.wizevent.name}</p>
                    <p>Date: {formatOrder(ticket.wizevent.validUntil)}</p>
                    <QRCode value={"localhost:3000/validator/"+ticket.id}></QRCode>
                  </pre>
                </Card>
              </div>
            </>)
    }
}

export default TicketValidator