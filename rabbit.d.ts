export as namespace MyRabbitConnection

export class Rabbit {
    constructor(uri: string, queue: string)

    public async send(message: string): void
    public async receive(callback: (message: string) => void): void
}
