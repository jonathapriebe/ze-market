import RabbitmqServer from '@src/rabbitmq-server';
import { Product } from './models/products';
import config from 'config';

export const consumer = async (): Promise<void> => {
  const server = new RabbitmqServer(config.get('App.amqp'));
  await server.start();
  await server.consume('incremented', async (message) => {
    await Product.updateOne(
      {
        name: JSON.parse(message.content.toString()),
      },
      { $inc: { quantity: 1 } }
    );
  });
  await server.consume('decremented', async (message) => {
    await Product.updateOne(
      {
        name: JSON.parse(message.content.toString()),
        quantity: { $gt: 0 },
      },
      { $inc: { quantity: -1 } }
    );
  });
};
