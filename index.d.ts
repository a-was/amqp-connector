export as namespace MyRabbitConnection

export class Rabbit {
    constructor(uri: string, queue: string)

    public send(message: string): void
    public receive(callback: (message: string) => void): void
}
