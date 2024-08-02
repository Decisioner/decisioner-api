import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [AuthModule, UserModule, PollModule],
})
export class ApiModule {}
