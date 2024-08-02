import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { DatabaseModule } from 'src/v1/common/database/database.module';

@Module({
  controllers: [PollController],
  providers: [PollService],
  imports: [DatabaseModule],
})
export class PollModule {}
