import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('orders')
export class OrdersController {

    @Get('')
    public getListOrders(_: Request, res: Response): void {
        res.send({
            "orders": [
                {
                  "id": "123",
                  "products": [
                    {
                      "name": "Watermelon",
                      "quantity": 2,
                      "price": 5.47
                    }
                   ],
                  "total": 10.94
               }
            ]
          });
    }
}