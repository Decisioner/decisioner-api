import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/v1/common/database/repositories';
import {
  AlreadyRegisteredException,
  InvalidEntityIdException,
} from 'src/v1/common/exceptions';
import { UserDto } from 'src/v1/api/user/dtos/user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userRepository.find({
      OR: [{ username }, { email: username }],
    });
    if (!user) {
      throw new InvalidEntityIdException('User');
    }

    const isMatch = await this.checkPassword(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('The password is incorrect');
    }

    delete user.password;
    return user;
  }

  async register(registerDto: UserDto) {
    const { password, ...securedUser } = registerDto;

    const user = await this.userRepository.find({
      username: securedUser.username,
    });

    if (user) throw new AlreadyRegisteredException('username');

    const hashedPassword = await this.hashPassword(password);

    await this.userRepository.create({
      ...securedUser,
      password: hashedPassword,
    });
  }

  async login(user: User) {
    return this.getAccessToken(user.id);
  }

  async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  private getAccessToken(userId: string) {
    const payload = { sub: userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
