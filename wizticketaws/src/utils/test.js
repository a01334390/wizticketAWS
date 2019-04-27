const superagent = require('superagent')

superagent
.post('http://3.82.4.223:3000/api/Ticket')
.send({
    "$class": "org.example.basic.Ticket",
    "ticketId": "1234",
    "eventId": "123",
    "category": "SOD",
    "seat": 69,
    "value": 233,
    "ownerId": "23123213123122112321"
  })
  .set('X-API-Key', 'foobar')
  .set('accept', 'json')
  .end((err, res) => {
    if (err) { console.log(err)}
    console.log(res)
  });