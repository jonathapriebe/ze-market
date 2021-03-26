import { OrdersController } from "@src/controllers/orders";
import { Orders } from "../orders";

describe('Orders Service', () => {
    it('Sould return list of orders', async () => {
        const expectedResponse = {
            orders: [
              {
                id: '123',
                products: [
                  {
                    name: 'Watermelon',
                    quantity: 2,
                    price: 5.47,
                  },
                ],
                total: 10.94,
              },
            ],
          };

        const orders = new Orders();
        const ordersResult = await orders.list();

        expect(ordersResult).toEqual(expectedResponse);
    });
});