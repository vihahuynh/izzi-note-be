import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
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
      throw new UnauthorizedException('invalid username or password');
    }
    const userForToken = {
      username,
      id: user._id,
    };
    const token = await this.jwtService.signAsync(userForToken);
    return { token, username };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
