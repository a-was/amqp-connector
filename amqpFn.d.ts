declare function amqpConnector(uri: string, queue: string): any

declare namespace amqpConnector {
    export function receive(callback: (message: string) => void): void
    export function send(message: string): void
    export function close(): void
}
export = amqpConnector
