import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from 'src/common/database/repositories/user.repository';
import { AlreadyRegisteredException } from 'src/common/exceptions/already-registered.exception';
import { InvalidEntityIdException } from 'src/common/exceptions/invalid-entity-id.exception';
import { UserDto } from 'src/user/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async checkPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }
}
