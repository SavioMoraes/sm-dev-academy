import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Notification } from '../../interfaces/notification.interface';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly apiUrl = `${environment.apiUrl}/notifications`;

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  markAsRead(id: string): Observable<Notification> {
    return this.http.patch<Notification>(
      `${this.apiUrl}/${id}/read`,
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }

  deleteNotification(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  markAsUnread(id: string): Observable<Notification> {
    return this.http.patch<Notification>(
      `${this.apiUrl}/${id}/unread`,
      {},
      {
        headers: this.getHeaders(),
      },
    );
  }
}
