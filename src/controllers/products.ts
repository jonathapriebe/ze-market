import { Controller, Get } from '@overnightjs/core';
import { Product } from '@src/models/products';
import { Request, Response } from 'express';
import { BaseController } from '.';

@Controller('products')
export class ProductsController extends BaseController {
  @Get(':name')
  public async getProduct(req: Request, res: Response): Promise<Response> {
    const name = req.params.name;
    const product = await Product.findOne({ name });
    if (!product) {
      this.sendFindErrorResponse(res, 404, 'Product not found!');
    }
    return res.send(product);
  }
}
