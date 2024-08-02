import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Poll } from '@prisma/client';

@Injectable()
export class PollRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PollUncheckedCreateInput): Promise<Poll> {
    return this.prismaService.poll.create({ data });
  }
}
