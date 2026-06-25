import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { AuthModule } from '../auth/auth.module';

import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';

@Module({
  imports: [DatabaseModule, AuthModule],

  controllers: [RatingController],

  providers: [RatingService],
})
export class RatingModule {}
