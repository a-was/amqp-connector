const amqp = require('amqplib')

class AMQPConnector {
    constructor(uri, queue) {
        this.uri = uri
        this.queue = queue

        amqp.connect(uri)
            .then((conn) => {
                this.connection = conn
                return this.connection.createChannel()
            })
            .then((ch) => {
                this.channel = ch
                this.channel.assertQueue(this.queue, { durable: true })
            })
    }

    receive(callback) {
        try {
            this.channel.consume(this.queue, (message) => {
                if (message != null) {
                    callback(message.content.toString())
                    this.channel.ack(message)
                }
            }, { noAck: false })
        } catch (error) {
            console.error(error)
        }
    }

    send(message) {
        try {
            this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true })
        } catch (error) {
            console.error(error)
        }
    }

    close() {
        this.channel.close()
        this.connection.close()
    }
}

module.exports.AMQPConnector = AMQPConnector
