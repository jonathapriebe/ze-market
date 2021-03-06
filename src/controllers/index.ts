import logger from '@src/logger';
import { Response } from 'express';
import mongoose from 'mongoose';

export abstract class BaseController {
  protected sendCreatedUpdatedErrorResponse(
    res: Response,
    error: mongoose.Error.ValidationError | Error
  ): Response {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send({ code: 422, error: error.message });
    } else {
      logger.error(error);
      return res
        .status(500)
        .send({ code: 500, error: 'Something went wrong!' });
    }
  }

  protected sendFindErrorResponse(
    res: Response,
    code: number,
    message: string
  ): Response {
    return res.status(code).send({ code: code, error: message });
  }
}
