import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotifications(userId: string) {
    return this.prismaService.notificationUser.findMany({
      where: {
        userId,
      },

      include: {
        notification: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(userId: string, notificationId: string) {
    return this.prismaService.notificationUser.update({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },

      data: {
        read: true,
      },
    });
  }

  async deleteNotification(userId: string, notificationId: string) {
    return this.prismaService.notificationUser.delete({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },
    });
  }
}
