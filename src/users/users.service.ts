import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const saltRound = 10;
    const hashPwd = await bcrypt.hash(password, saltRound);
    const newUser = new this.userModel({ username, hashPwd });
    return newUser.save();
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userModel.findOne({ username });
    const passwordCorrect = !user
      ? false
      : bcrypt.compare(password, user.hashPwd);
    if (!(user && passwordCorrect)) {
      throw new ForbiddenException('invalid username or password');
    }
    const userForToken = {
      username,
      id: user._id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    return { token, username };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
