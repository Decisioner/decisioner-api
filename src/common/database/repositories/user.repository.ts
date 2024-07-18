import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    return this.prismaService.user.create({ data });
  }

  async find(where: Prisma.UserWhereInput): Promise<User> {
    return this.prismaService.user.findFirst({ where });
  }

  findById(id: string) {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }
}
