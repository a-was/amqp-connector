interface AMQPConnector {
    receive(callback: (message: string) => void): void
    send(message: string): void
    close(): void
}

declare function amqpConnector(uri: string, queue: string): AMQPConnector

export = amqpConnector
