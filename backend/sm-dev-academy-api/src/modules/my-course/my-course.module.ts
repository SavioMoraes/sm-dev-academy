import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';

import { AuthModule } from '../auth/auth.module';

import { MyCourseController } from './my-course.controller';
import { MyCourseService } from './my-course.service';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],

  controllers: [
    MyCourseController,
  ],

  providers: [
    MyCourseService,
  ],
})
export class MyCourseModule {}