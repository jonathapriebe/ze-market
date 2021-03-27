import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { OrdersController } from './controllers/orders';
import { Application } from 'express';
import * as database from '@src/database';
import { ProductsController } from './controllers/products';
import { populate } from '@src/populate';
import { consumer } from '@src/receive';
//import { apiErrorValidator } from './middlewares/api-error-validator';
import logger from './logger';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.setupControllers();
    this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
    // this.app.use(
    //   cors({
    //     origin: '*',
    //   })
    // );
  }

  private setupControllers(): void {
    const ordersController = new OrdersController();
    const productsController = new ProductsController();
    this.addControllers([ordersController, productsController]);
  }

  private async databaseSetup(): Promise<void> {
    await database.connect();
  }

  public async close(): Promise<void> {
    await database.close();
  }

  public getApp(): Application {
    return this.app;
  }

  private async setupPopulate(): Promise<void> {
    await populate();
  }

  private async initConsumer(): Promise<void> {
    await consumer();
  }

  // private setupErrorHandlers(): void {
  //   this.app.use(apiErrorValidator);
  // }

  public async start(): Promise<void> {
    await this.setupPopulate();
    await this.initConsumer();
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}
