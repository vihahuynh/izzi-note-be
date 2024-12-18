import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

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
}
