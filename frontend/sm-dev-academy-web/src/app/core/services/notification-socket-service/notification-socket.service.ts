import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationSocketService {
  private socket!: Socket;

  connect(): void {
    if (this.socket?.connected) {
      return;
    }

    this.socket = io(environment.apiUrl);
  }

  onNotificationCreated(callback: () => void): void {
    this.socket.on('notification-created', callback);
  }

  onNotificationUpdated(callback: () => void): void {
    this.socket.on('notification-updated', callback);
  }

  onNotificationDeleted(callback: () => void): void {
    this.socket.on('notification-deleted', callback);
  }
}
