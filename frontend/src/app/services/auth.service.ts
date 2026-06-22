import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, finalize, tap } from 'rxjs';
import {
  AuthResponse,
  LoginData,
  RegisterData,
  User,
} from '../models/auth';
import { environmentApi } from '../../environments/environmentApi';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenKey = 'todo_auth_token';

  login(data: LoginData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environmentApi.apiUrl}/login`, data)
      .pipe(tap((response) => this.setToken(response.token)));
  }

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${environmentApi.apiUrl}/register`, data)
      .pipe(tap((response) => this.setToken(response.token)));
  }

  logout(): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${environmentApi.apiUrl}/logout`, {})
      .pipe(finalize(() => this.clearToken()));
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environmentApi.apiUrl}/user`);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }

  private setToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
  }
}
