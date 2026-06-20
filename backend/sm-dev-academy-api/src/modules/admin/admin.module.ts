import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { YoutubeModule } from '../youtube/youtube.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../../database/prisma.service';
import { UserModule } from '../user/user.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    AuthModule,
    YoutubeModule,
    UserModule,
    NotificationModule,
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