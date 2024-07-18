import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dtos/user.dto';
import { LocalAuthGuard } from 'src/common/security/local.guard';
import { RequestWithUser } from 'src/common/utils/types';
import { JwtAuthGuard } from 'src/common/security/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: UserDto) {
    return this.authService.register(registerDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  getMe(@Req() req: RequestWithUser) {
    return req.user;
  }
}
