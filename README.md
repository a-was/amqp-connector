# AMQP-connector

## Usage:

### sender.js
```js
const amqp = require('amqp-connector')
var connector = new amqp.AMQPConnector('amqp://', 'someQueue')

connector.send('some txt message')
connector.send(JSON.stringify({msg: 'some json'}))

connector.close()
```

### receiver.js
```js
const amqp = require('amqp-connector')
var connector = new amqp.AMQPConnector('amqp://', 'someQueue')

connector.receive(function (message) {
    console.log(message)  // for txt
    console.log(JSON.parse(message))  // for JSON
})
```
