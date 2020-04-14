const amqp = require('amqplib')

class AMQPConnector {
    constructor(uri, queue) {
        this.uri = uri
        this.queue = queue
        this.connected = false

        amqp.connect(uri)
            .then((conn) => {
                this.connection = conn
                return this.connection.createChannel()
            })
            .then((ch) => {
                this.channel = ch
                this.channel.assertQueue(this.queue, { durable: true })
            })
            .then(() => {
                this.connected = true
            })
            .catch(function (err) {
                console.error(err)
            })
    }

    _checkReady() {
        return new Promise((resolve, reject) => {
            var start = Date.now()
            var interval = setInterval(() => {
                if (this.connected === true) {
                    clearInterval(interval)
                    resolve()
                } else if (Date.now() - start > 5000) {
                    reject(new Error('Connection timed out'))
                }
            }, 20)
        })
    }

    _defaultCallback(message) { console.log(message) }

    receive(callback = this._defaultCallback) {
        this._checkReady().then(() => {
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
        })
    }

    send(message) {
        this._checkReady().then(() => {
            try {
                this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true })
            } catch (error) {
                console.error(error)
            }
        })
    }

    close() {
        this._checkReady().then(() => {
            this.channel.close()
            this.connection.close()
        })
    }
}

module.exports.AMQPConnector = AMQPConnector
