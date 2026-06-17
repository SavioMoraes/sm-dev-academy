import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Notification } from '../../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly API_URL = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) {}

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.API_URL}/notifications`);
  }

  markAsRead(id: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.API_URL}/notifications/${id}/read`, {});
  }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/notifications/${id}`);
  }
}
