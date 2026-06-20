import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { PrismaService } from '../../database/prisma.service';
import { NotificationGateway } from './notification.gateway';

@Module({
  imports: [
    AuthModule,
  ],

  controllers: [
    NotificationController,
  ],

  providers: [
    NotificationService,
    NotificationGateway,
    PrismaService,
  ],

  exports: [
    NotificationGateway,
  ],
})
export class NotificationModule {}
