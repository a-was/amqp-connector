const amqp = require('amqplib')

var amqpConnector = function (uri, queue) {
    var exports = {}

    this.uri = uri
    this.queue = queue
    this.connected = false

    amqp.connect(this.uri)
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

    function _checkReady() {
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

    function _defaultCallback(message) { console.log(message) }

    exports.receive = (callback = _defaultCallback) => {
        _checkReady().then(() => {
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

    exports.send = (message) => {
        _checkReady().then(() => {
            try {
                this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true })
            } catch (error) {
                console.error(error)
            }
        })
    }

    exports.close = () => {
        _checkReady().then(() => {
            this.channel.close()
            this.connection.close()
        })
    }

    return exports
}

module.exports = amqpConnector
