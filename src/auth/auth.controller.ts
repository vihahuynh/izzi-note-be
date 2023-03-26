import {
  Body,
  Controller,
  Get,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Session() session: any) {
    const user = await this.authService.signIn(signInDto);
    session.username = user.username;
    return user;
  }

  @Post('signout')
  signOut(@Session() session: any) {
    session.username = null;
    return;
  }

  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@CurrentUser() user: string) {
    return user;
  }

  // @Get('me')
  // async getCurrentUser(@Session() session: any) {
  //   const user = await this.authService.getCurrentUser(session?.username);
  //   if (!user) throw new NotFoundException('user not found');
  //   return user;
  // }
}
