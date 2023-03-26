import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async find(query: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(query);
  }

  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async remove(id: string): Promise<void> {
    return this.userModel.findByIdAndDelete(id);
  }
}
