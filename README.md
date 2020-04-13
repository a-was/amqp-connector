# AMQP-connector

### Description:
Easy in use class for making AMQP connections in node.  
Of course you need AMQP server for this to work. I recommend [RabbitMQ](https://www.rabbitmq.com/)

### Installation:
`npm install a-wasilewski/amqp-connector`

### Usage:

#### sender.js
```js
const amqp = require('amqp-connector')
var connector = new amqp.AMQPConnector('amqp://', 'someQueue')

connector.send('some text message')
connector.send(JSON.stringify({ msg: 'some json' }))

connector.close()
```
Connection is created in class constructor, so it needs to be closed if you want script to end. Otherwise script will be still running because connection is still maintained  

If You want to use it with express or some other http server - you do not need to close connection
```js
const express = require('express')
const amqp = require('amqp-connector')

var app = express()
var connector = new amqp.AMQPConnector('amqp://', 'someQueue')

app.get('/', function (req, res) {
    connector.send('some text message')
    res.send('ok')
})

```

#### receiver.js
```js
const amqp = require('amqp-connector')
var connector = new amqp.AMQPConnector('amqp://', 'someQueue')

connector.receive(function (message) {
    console.log(message)  // for text
    console.log(JSON.parse(message))  // for JSON
})
```

Also there is no need to close connection in receiver - we need it to working all the time.
