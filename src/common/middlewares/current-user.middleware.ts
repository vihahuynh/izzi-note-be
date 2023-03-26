/* eslint-disable @typescript-eslint/no-namespace */
import { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Request, Response, NextFunction } from 'express';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDocument;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { username } = req.session || {};
    if (username) {
      const user = await this.usersService.findOne({ username });
      req.currentUser = user;
    }
    next();
  }
}
