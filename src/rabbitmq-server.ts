import config, { IConfig } from 'config';
import { Connection, Channel, connect, Message } from 'amqplib';

const dbConfig: IConfig = config.get('App');

const sourceQueue: string = dbConfig.get('sourceQueue');

export default class RabbitmqServer {
  private conn!: Connection;
  private channel!: Channel;

  constructor(private uri: string) {}

  async start(): Promise<void> {
    this.conn = await connect(this.uri);
    this.channel = await this.conn.createChannel();
  }

  async consume(
    queue: string,
    callback: (message: Message) => void
  ): Promise<void> {
    if (sourceQueue) {
      this.channel.assertQueue(queue, {
        durable: true,
      });

      this.channel.bindQueue(queue, sourceQueue, queue);

      this.channel.consume(queue, (message) => {
        if (message) {
          callback(message);
          this.channel.ack(message);
        }
      });
      return;
    }
  }
}
