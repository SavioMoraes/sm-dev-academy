import { AuthUser } from './auth-user.interface';

export interface LoginResponse {
  message: string;
  access_token: string;
  user: AuthUser;
}