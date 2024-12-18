import { BaseRepositoryAbstract } from 'src/libs/base.repository';
import { User } from './schemas/user.schema';
import { BaseRepositoryInterface } from 'src/libs/base.repository.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

interface UserRepositoryInterface extends BaseRepositoryInterface<User> {}

@Injectable()
export class UserRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
  ) {
    super(userRepository);
  }
}
