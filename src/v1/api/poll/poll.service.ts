import { Injectable } from '@nestjs/common';
import { Poll } from '@prisma/client';

import { PollRepository } from '../../common/database/repositories';

import { PollCreateDto } from './dtos';

@Injectable()
export class PollService {
  constructor(private readonly pollRepository: PollRepository) {}

  async createPoll(userId: string, body: PollCreateDto): Promise<Poll> {
    const poll = await this.pollRepository.create({
      ...body,
      authorId: userId,
    });

    return poll;
  }
}
