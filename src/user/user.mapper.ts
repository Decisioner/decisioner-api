import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserMapper {
  getUsers(users: User[]) {
    return users.map((user) => this.getUser(user));
  }

  getUser(user: User) {
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.fullName,
    };
  }
}
