import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { YoutubeModule } from '../youtube/youtube.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    AuthModule,
    YoutubeModule,
  ],
  controllers: [
    AdminController,
  ],
  providers: [
    AdminService,
  ],
})
export class AdminModule {}