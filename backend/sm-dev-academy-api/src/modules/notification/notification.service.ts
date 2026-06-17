import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotifications() {
    return this.prismaService.notification.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(id: string) {
    return this.prismaService.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });
  }

  async deleteNotification(id: string) {
    return this.prismaService.notification.delete({
      where: {
        id,
      },
    });
  }
}
