import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server!: Server;

  emitNotificationCreated(): void {
    this.server.emit('notification-created');
  }

  emitNotificationUpdated(): void {
    this.server.emit('notification-updated');
  }

  emitNotificationDeleted(): void {
    this.server.emit('notification-deleted');
  }
}
