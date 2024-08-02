import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository, PollRepository } from './repositories';

@Module({
  providers: [PrismaService, UserRepository, PollRepository],
  exports: [PrismaService, UserRepository, PollRepository],
})
export class DatabaseModule {}
