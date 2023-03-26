import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config/dist';

// console.log('salt: ', process.env.SALT_ROUND);

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    private config: ConfigService,
  ) {}

  async findOne(query: FilterQuery<User>): Promise<UserDocument> {
    return this.userModel.findOne(query);
  }

  async find(query: FilterQuery<User>): Promise<UserDocument[]> {
    return this.userModel.find(query);
  }

  async create(user: User): Promise<UserDocument> {
    const hashPassword = await bcrypt.hash(
      user.password,
      parseInt(this.config.get<string>('SALT_ROUND')),
    );
    const newUser = new this.userModel({ ...user, password: hashPassword });
    return newUser.save();
  }

  async update(id: string, user: Partial<User>): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id: string): Promise<void> {
    return this.userModel.findByIdAndDelete(id);
  }
}
