import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { UserMapper } from 'src/v1/api/user/user.mapper';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { LocalStrategy } from 'src/v1/common/security/local.strategy';
import { JwtStrategy } from 'src/v1/common/security/jwt.strategy';
import { DatabaseModule } from 'src/v1/common/database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UserMapper],
  imports: [
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
