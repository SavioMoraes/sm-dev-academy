import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../../database/prisma.service';

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
    PrismaService,
  ],
})
export class AdminModule {}