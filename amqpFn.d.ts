interface AMQPConnector {
    receive(callback: (message: string) => void): void
    send(message: string): void
    close(): void
}

declare function amqpConnector(uri: string, queue: string): AMQPConnector

declare namespace amqpConnector {
    function defaultCallback(message: string): void
    export function receive(callback: (message: string) => void = defaultCallback): void
    export function send(message: string): void
    export function close(): void
}
export = amqpConnector
