import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [SharedModule],
  controllers: [AuthController],
})
export class AuthModule {}
