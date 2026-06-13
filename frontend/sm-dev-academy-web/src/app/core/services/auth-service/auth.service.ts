import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { LoginRequest } from '../../interfaces/login-request.interface';
import { RegisterRequest } from '../../interfaces/register-request.interface';
import { LoginResponse } from '../../interfaces/login-response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;

  private readonly TOKEN_KEY = 'smda_token';

  private readonly USER_KEY = 'smda_user';

  private readonly authStateSubject = new BehaviorSubject<boolean>(
    !!localStorage.getItem('smda_token'),
  );

  readonly authState$ = this.authStateSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, data);
  }

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/auth/register`, data);
  }

  setAuth(token: string, user: AuthUser): void {
    localStorage.setItem(this.TOKEN_KEY, token);

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));

    this.authStateSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem(this.USER_KEY);

    return user ? (JSON.parse(user) as AuthUser) : null;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);

    localStorage.removeItem(this.USER_KEY);

    this.authStateSubject.next(false);
  }

  updateProfile(data: { name?: string; email?: string }) {
    return this.http.patch(`${this.API_URL}/auth/profile`, data, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.http.patch(`${this.API_URL}/auth/change-password`, data, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }
}
