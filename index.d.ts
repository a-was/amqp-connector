export as namespace AMQPConnectorNS

export class AMQPConnector {
    constructor(uri: string, queue: string)

    public send(message: string): void
    public receive(callback: (message: string) => void): void
}
