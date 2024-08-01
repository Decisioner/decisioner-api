import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from 'src/user/dtos/user.dto';
import { LocalAuthGuard, JwtAuthGuard } from 'src/common/security';
import { CurrentUser } from 'src/common/decorators';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: UserDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
