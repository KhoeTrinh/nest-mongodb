import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import mongoose  from 'mongoose';

@Injectable()
export class UserMiddleware1 implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const { id } = req.params;
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid)
      throw new HttpException('Invalid userId', HttpStatus.BAD_REQUEST);
    next();
  }
}
