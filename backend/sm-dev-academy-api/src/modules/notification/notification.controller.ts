import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationService } from './notification.service';
import { DeleteNotificationsDto } from './dto/delete-notifications.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotifications(@Req() request: any) {
    return this.notificationService.getNotifications(request.user.sub);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') notificationId: string, @Req() request: any) {
    return this.notificationService.markAsRead(
      request.user.sub,
      notificationId,
    );
  }

  @Delete(':id')
  deleteNotification(@Param('id') notificationId: string, @Req() request: any) {
    return this.notificationService.deleteNotification(
      request.user.sub,
      notificationId,
    );
  }

  @Delete()
  deleteNotifications(
    @Body() dto: DeleteNotificationsDto,
    @Req() request: any,
  ) {
    return this.notificationService.deleteNotifications(
      request.user.sub,
      dto.ids,
    );
  }

  @Patch(':id/unread')
  markAsUnread(@Param('id') notificationId: string, @Req() request: any) {
    return this.notificationService.markAsUnread(
      request.user.sub,
      notificationId,
    );
  }
}
