import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  async getNotifications(userId: string) {
    const notifications = await this.prismaService.notificationUser.findMany({
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

    return notifications.map((item) => ({
      id: item.notificationId,
      title: item.notification.title,
      playlistId: item.notification.playlistId,
      action: item.notification.action,
      read: item.read,
      createdAt: item.notification.createdAt,
    }));
  }

  async markAsRead(userId: string, notificationId: string) {
    const notification = await this.prismaService.notificationUser.update({
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

    this.notificationGateway.emitNotificationUpdated();

    return notification;
  }

  async deleteNotification(userId: string, notificationId: string) {
    const notification = await this.prismaService.notificationUser.delete({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },
    });

    this.notificationGateway.emitNotificationDeleted();

    return notification;
  }

  async markAsUnread(userId: string, notificationId: string) {
    const notification = await this.prismaService.notificationUser.update({
      where: {
        userId_notificationId: {
          userId,
          notificationId,
        },
      },

      data: {
        read: false,
      },
    });

    this.notificationGateway.emitNotificationUpdated();

    return notification;
  }
}
