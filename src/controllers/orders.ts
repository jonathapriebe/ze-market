import { Controller, Get, Post } from '@overnightjs/core';
import { Order } from '@src/models/orders';
import { Product } from '@src/models/products';
import { Request, Response } from 'express';
import { BaseController } from '.';

export interface Item {
  name: string;
  quantity: number;
}

@Controller('orders')
export class OrdersController extends BaseController {
  @Get('')
  public async getOrders(_: Request, res: Response): Promise<Response> {
    try {
      const orders = await Order.find({});
      return res.send({ orders });
    } catch (error) {
      return this.sendCreatedUpdatedErrorResponse(res, error);
    }
  }

  @Get(':id')
  public async getOrder(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;
      const order = await Order.findOne({ _id: id });
      if (!order) {
        return this.sendFindErrorResponse(res, 404, 'Order not found!');
      }
      return res.send(order);
    } catch (error) {
      return this.sendCreatedUpdatedErrorResponse(res, error);
    }
  }

  @Post('')
  public async postOrder(req: Request, res: Response): Promise<Response> {
    try {
      const products = req.body.products;
      const errors: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const allProducts: any = [];
      let total = 0;
      const bulk = Product.collection.initializeOrderedBulkOp();
      for (const item of products) {
        if (!item.name || !item.quantity) {
          return this.sendFindErrorResponse(
            res,
            400,
            'Name and quantity are required!'
          );
        }
        if (item.quantity < 0) {
          return this.sendFindErrorResponse(
            res,
            400,
            'Quantity must be greater than 0!'
          );
        }
        const product = await Product.findOne({ name: item.name });
        if (!product) {
          errors.push(`Product ${item.name} not found`);
          continue;
        }

        if (product.quantity == 0 || product.quantity - item.quantity < 0) {
          errors.push(`Product ${item.name} out of stock`);
          continue;
        }
        const subTotal = product.price * item.quantity;
        total += subTotal;
        allProducts.push({
          name: product.name,
          price: product.price,
          quantity: item.quantity,
        });

        bulk
          .find({ name: item.name })
          .update({ $inc: { quantity: -Math.abs(item.quantity) } });
      }

      if (errors.length > 0)
        return this.sendFindErrorResponse(res, 400, errors.toString());

      const order = new Order();
      order.products = allProducts;
      order.total = parseFloat(total.toFixed(2));
      order.save();
      bulk.execute();

      return res.status(201).send(order);
    } catch (error) {
      return this.sendCreatedUpdatedErrorResponse(res, error);
    }
  }
}
