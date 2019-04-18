import React from "react";

import { Auth, API, graphqlOperation } from 'aws-amplify'

import { Table, Button, Notification, MessageBox, Message, Tabs, Icon, Form, Dialog, Input, Card, Tag } from 'element-react'

import { S3Image } from 'aws-amplify-react'

const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    registered
    group
    tickets(sortDirection: ASC, limit: 999) {
      items {
        id
        category
        seat
        value
        wizevent {
          id
          name
          description
          validUntil
          pictures {
            key
          }
          place {
            id
            name
          }

        }
      }
      nextToken
    }
  }
}
`;

class ProfilePage extends React.Component {
  state = {
    tickets: [],
    group: '',
    emailDialog: false,
    verificationForm: false,
    vertificationCode: "",
    email: this.props.userAttributes && this.props.userAttributes.email,
    columns: [
      { prop: "name", width: "150" },
      { prop: "value", width: "330" },
      {
        prop: "tag", width: "150", render: row => {
          if (row.name === "Email") {
            var emailVerified = this.props.userAttributes.email_verified
            return emailVerified ? (<Tag type="success">Verified</Tag>) : (<Tag type="danger"> Not Verified </Tag>)
          }
        }
      },
      {
        prop: "operations", render: row => {
          switch (row.name) {
            case "Email":
              return (
                <Button onClick={() => this.setState({ emailDialog: true })} type="info" size="small">
                  Edit
              </Button>
              )
            case "Status":
              return (
                <Button size="small" type="success">
                  Escalate
                </Button>
              )
            case "Delete Profile":
              return (
                <Button onClick={this.handleDeleteProfile} type="danger" size="small">
                  Delete
              </Button>
              )
            default:
              return (
                <></>
              )
          }
        }
      }
    ]
  };

  componentDidMount = () => {
    if (this.props.userAttributes) {
      this.getUserTickets(this.props.userAttributes.sub)
    }
  }

  getUserTickets = async userId => {
    const input = { id: userId }
    const result = await API.graphql(graphqlOperation(getUser, input))
    this.setState({ tickets: result.data.getUser.tickets.items, group: result.data.getUser.group })
  }

  handleUpdateEmail = async () => {
    try{
      const updatedAttributes = {
        email: this.state.email
      }
  
      const result = await Auth.updateUserAttributes(this.props.user, updatedAttributes)
      if(result === "SUCCESS"){
        this.sendVerificationCode("email")
      }
    } catch(err){
      console.error(err)
      Notification.error({
        title: "Error",
        message: "Error updating attribute"
      })
    }
  }

  sendVerificationCode = async attr => {
    await Auth.verifyCurrentUserAttribute(attr)
    this.setState({ verificationForm: true})
    Message({
      type: "info",
      customClass: "message",
      message: `Verification code sent to ${this.state.email}`
    })
  }

  handleVerifyEmail = async attr => {
    try{
      const result = await Auth.verifyCurrentUserAttributeSubmit(
        attr,
        this.state.vertificationCode
      )

      Notification({
        title: "Success",
        message: "Email successfully verified",
        type: `${result.toLowerCase()}`
      })

      setTimeout(() => window.location.reload(), 3000)
    }catch(err){
       console.error(err)
       Notification.error({
         title: "Error",
         message: `${err.message || "Error updating email"}`
       })
    }
  }

  handleDeleteProfile = () => {
    MessageBox.confirm(
      "This will PERMANENTLY delete your account. Continue?",
      "Attention!",
      {
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        type: "warning"
      }
    ).then(async () => {
      try{
        await this.props.user.deleteUser()
      }catch(err){
        console.err(err)
      }
    }).catch(() => {
      Message({
        type: "info",
        message: "Delete was canceled"
      })
    })
  }

  render() {
    const { tickets, columns, group, emailDialog, email, verificationForm, vertificationCode } = this.state
    const { user, userAttributes } = this.props

    return userAttributes && (
      <>
        <Tabs activeName="1" className="profile-tabs">
          <Tabs.Pane label={
            <>
              <Icon name="document" className="icon" />
              Summary
        </>
          }>
            <h2 className="header"> Profile Summary </h2>
            <Table columns={columns} showHeader={false} rowClassName={row => row.name === "Delete Profile" && 'delete-profile'} data={[
              { name: "Your ID", value: userAttributes.sub },
              { name: "Username", value: user.username },
              { name: "Email", value: userAttributes.email },
              { name: "Phone Number", value: userAttributes.phone_number },
              { name: "Status", value: group },
              { name: "Delete Profile", value: "Sorry to see you go" }

            ]} />
          </Tabs.Pane>
          <Tabs.Pane name="2" label={
            <>
              <Icon name="message" className="icon" />
              Tickets
        </>
          }>
            <h2 className="header"> Ticket History </h2>
            {tickets.map(ticket => (
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
                    <p>For the event:  {ticket.wizevent.name}</p>

                  </pre>
                </Card>
              </div>
            ))}

          </Tabs.Pane>
        </Tabs>

        {/* E-mail dialog */}
        <Dialog size="large" customClass="dialog" title="Edit Email" visible={emailDialog} onCancel={() => this.setState({ emailDialog: false })}>
          <Dialog.Body>
            <Form labelPosition="top">
              <Form.Item label="Email">
                <Input value={email} onChange={email => this.setState({ email })}>
                </Input>
              </Form.Item>
              {verificationForm && (
                <Form.Item label="Enter Verification Code" labelWidth="120">
                    <Input onChange={vertificationCode => this.setState({vertificationCode})} value={vertificationCode}></Input>
                </Form.Item>
              )}
            </Form>
          </Dialog.Body>
          <Dialog.Footer>
            <Button onClick={() => this.setState({ emailDialog: false })}>
              Cancel
                    </Button>
            {!verificationForm && <Button type="primary" onClick={this.handleUpdateEmail}>
              Save </Button>} {verificationForm && (<Button type="primary" onClick={()=>this.handleVerifyEmail('email')}> Submit</Button>)}
          </Dialog.Footer>
        </Dialog>
      </>
    )
  }
}

export default ProfilePage;