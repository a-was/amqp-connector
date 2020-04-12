const amqp = require('amqplib')

class Rabbit {
    constructor(uri, queue) {
        this.uri = uri
        this.queue = queue

        this.connection = amqp.connect(uri)
    }

    async send(message) {
        try {
            var conn = await this.connection
            var ch = await conn.createChannel()
            await ch.assertQueue(this.queue, { durable: true })
            ch.sendToQueue(this.queue, Buffer.from(message), { persistent: true })
        } catch (error) {
            console.error(error)
        }
    }

    async receive(callback) {
        try {
            var conn = await this.connection
            var ch = await conn.createChannel()
            await ch.prefetch(1)
            await ch.assertQueue(this.queue, { durable: true })
            ch.consume(this.queue, (message) => {
                if (message != null) {
                    callback(message.content.toString())
                    ch.ack(message)
                }
            }, { noAck: false })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = Rabbit
