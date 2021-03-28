import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import { OrdersController } from './controllers/orders';
import { Application } from 'express';
import * as database from '@src/database';
import { ProductsController } from './controllers/products';
import { populate } from '@src/populate';
import { consumer } from '@src/receive';
import logger from './logger';
import apiSchema from './api.schema.json';
import swaggerUi from 'swagger-ui-express';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  public async init(): Promise<void> {
    this.setupExpress();
    this.docsSetup();
    this.setupControllers();
    this.databaseSetup();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
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
    logger.info('Populating Mongo with data');
    await populate();
  }

  private async initConsumer(): Promise<void> {
    logger.info('Initializing consumer');
    await consumer();
  }

  private async docsSetup(): Promise<void> {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
  }

  public async start(): Promise<void> {
    await this.setupPopulate();
    await this.initConsumer();
    this.app.listen(this.port, () => {
      logger.info(`Server listening on port: ${this.port}`);
    });
  }
}
