import { Controller, Get, Post } from '@overnightjs/core';
import { Product } from '@src/models/products';
import { Request, Response } from 'express';

@Controller('products')
export class ProductsController {
  @Get(':name')
  public getProduct(_: Request, res: Response): void {
    const product = new Product();
    res.send({
      name: "Garlic",
      price: 10.22,
      quantity: 8
    });
  }

  @Post('')
  public async postProduct(req: Request, res: Response): Promise<void> {
    const product = new Product(req.body);
    const result = await product.save();
    res.status(201).send(result);
  }
}
