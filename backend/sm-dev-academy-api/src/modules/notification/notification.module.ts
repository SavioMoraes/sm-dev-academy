import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  imports: [
    AuthModule,
  ],

  controllers: [
    NotificationController,
  ],

  providers: [
    NotificationService,
    PrismaService,
  ],
})
export class NotificationModule {}
