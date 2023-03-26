import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signIn(signInDto: SignInDto) {
    const user: User = await this.usersRepository.findOne({
      email: signInDto.email,
    });

    if (!user) throw new NotFoundException('Invalid email or password');
    const isMatch = await bcrypt.compare(signInDto.password, user.password);

    if (!isMatch) throw new NotFoundException('Invalid email or password');
    return user;
  }
}
