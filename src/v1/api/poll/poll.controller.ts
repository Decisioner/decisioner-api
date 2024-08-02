import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { JwtAuthGuard } from 'src/v1/common/security';
import { CurrentUser } from 'src/v1/common/decorators';

import { PollService } from './poll.service';
import { PollCreateDto } from './dtos';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPoll(@CurrentUser() user: User, @Body() body: PollCreateDto) {
    return this.pollService.createPoll(user.id, body);
  }
}
