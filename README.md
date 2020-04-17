# AMQP-connector

### Description:
Easy in use function for making AMQP connections in node.  
Of course you need AMQP server for this to work. I recommend [RabbitMQ](https://www.rabbitmq.com/)

### Installation:
`npm install a-was/amqp-connector`

### Usage:

#### sender.js
```js
const amqpConnector = require('amqp-connector')
var connector = amqpConnector('amqp://', 'someQueue')  // amqp uri -> amqp://username:password@host/vhost

connector.send('some text message')
connector.send(JSON.stringify( { msg: 'some json' } ))

connector.close()
```
Connection needs to be closed if you want script to end. Otherwise script will be still running because connection is maintained.  

If You want to use it with express or some other http server - you do not need to close connection.
```js
const express = require('express')
const amqpConnector = require('amqp-connector')

var app = express()
var connector = amqpConnector('amqp://', 'someQueue')

app.get('/', function (req, res) {
    connector.send('some text message')
    res.send('ok')
})

```

#### receiver.js
```js
const amqpConnector = require('amqp-connector')
var connector = amqpConnector('amqp://', 'someQueue')

connector.receive(function (message) {
    console.log(message)  // for text
    console.log(JSON.parse(message))  // for JSON
})
```

Also there is no need to close connection in receiver - we need it working all of the time.
