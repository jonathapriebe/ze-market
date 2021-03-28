import { Order } from '@src/models/orders';
import { Product } from '@src/models/products';

describe('Orders functional tests', () => {
  beforeAll(async () => {
    await Order.deleteMany({});
    const order = new Order({
      products: [
        {
          name: 'Peanut',
          price: 9.84,
          quantity: 1,
        },
        {
          name: 'Kiwi',
          price: 9.21,
          quantity: 1,
        },
      ],
      total: 19.05,
      _id: '605fc06c59e82c0022f05ad5',
    });
    await order.save();

    await Product.deleteMany({});
    const product1 = new Product({
      name: 'Kiwi',
      price: 9.21,
      quantity: 2,
    });
    await product1.save();
    const product2 = new Product({
      name: 'Peanut',
      price: 9.84,
      quantity: 2,
    });
    await product2.save();
  });

  describe('When find orders', () => {
    it('Should be list orders', async () => {
      const list = {
        orders: [
          {
            id: '605fc06c59e82c0022f05ad5',
            products: [
              {
                name: 'Peanut',
                price: 9.84,
                quantity: 1,
              },
              {
                name: 'Kiwi',
                price: 9.21,
                quantity: 1,
              },
            ],
            total: 19.05,
          },
        ],
      };
      const { body, status } = await global.testRequest.get('/orders');
      expect(status).toBe(200);
      expect(body).toEqual(list);
    });

    it('Should be get order by id', async () => {
      const order = {
        products: [
          {
            name: 'Peanut',
            price: 9.84,
            quantity: 1,
          },
          {
            name: 'Kiwi',
            price: 9.21,
            quantity: 1,
          },
        ],
        total: 19.05,
        id: '605fc06c59e82c0022f05ad5',
      };
      const { body, status } = await global.testRequest.get(
        '/orders/605fc06c59e82c0022f05ad5'
      );
      expect(status).toBe(200);
      expect(body).toEqual(order);
    });

    it('Should return 404 when not found order by id', async () => {
      const { body, status } = await global.testRequest.get(
        '/orders/705fc06c87e82c8023f05ad8'
      );
      expect(status).toBe(404);
      expect(body).toEqual({
        code: 404,
        error: 'Order not found!',
      });
    });

    it('Should return 500 when id is not an ObjectId', async () => {
      const { body, status } = await global.testRequest.get('/orders/123');
      expect(status).toBe(500);
      expect(body).toEqual({
        code: 500,
        error: 'Something went wrong!',
      });
    });
  });

  describe('When create a order', () => {
    it('Should create a new Order', async () => {
      const bodyOrder = {
        products: [
          {
            name: 'Peanut',
            quantity: 1,
          },
          {
            name: 'Kiwi',
            quantity: 1,
          },
        ],
      };
      const { body, status } = await await global.testRequest
        .post('/orders')
        .send(bodyOrder);
      expect(status).toBe(201);
      expect(body).toEqual(
        expect.objectContaining({
          products: [
            {
              name: 'Peanut',
              quantity: 1,
              price: 9.84,
            },
            {
              name: 'Kiwi',
              quantity: 1,
              price: 9.21,
            },
          ],
          total: 19.05,
        })
      );
    });

    it('Should be return 422 when products not found', async () => {
      const bodyOrder = {
        products: [
          {
            name: 'Pear',
            quantity: 1,
          },
          {
            name: 'Juice',
            quantity: 1,
          },
        ],
      };
      const { body, status } = await await global.testRequest
        .post('/orders')
        .send(bodyOrder);
      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'Product Pear not found,Product Juice not found',
      });
    });

    it('Should be return 422 when product does not have a stock', async () => {
      const bodyOrder = {
        products: [
          {
            name: 'Peanut',
            quantity: 1,
          },
          {
            name: 'Kiwi',
            quantity: 999,
          },
        ],
      };
      const { body, status } = await await global.testRequest
        .post('/orders')
        .send(bodyOrder);
      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'Product Kiwi out of stock',
      });
    });

    it('Should be return 422 when body is wrong', async () => {
      const bodyOrder = {
        products: [
          {
            name: 'Peanut',
          },
          {
            name: 'Kiwi',
            quantity: 999,
          },
        ],
      };
      const { body, status } = await await global.testRequest
        .post('/orders')
        .send(bodyOrder);
      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'Name and quantity are required!',
      });
    });

    it('Should be return 422 when quantity is negative', async () => {
      const bodyOrder = {
        products: [
          {
            name: 'Peanut',
            quantity: -1,
          },
          {
            name: 'Kiwi',
            quantity: 999,
          },
        ],
      };
      const { body, status } = await await global.testRequest
        .post('/orders')
        .send(bodyOrder);
      expect(status).toBe(422);
      expect(body).toEqual({
        code: 422,
        error: 'Quantity must be greater than 0!',
      });
    });
  });
});
