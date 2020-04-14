export class AMQPConnector {
    constructor(uri: string, queue: string)

    private _checkReady(): void
    private _defaultCallback(message): void

    public send(message: string): void
    public receive(callback: (message: string) => void): void
    public close(): void
}
