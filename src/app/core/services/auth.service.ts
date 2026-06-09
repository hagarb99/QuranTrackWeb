import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

export interface LoginResponse {
  token: string;
  refreshToken: string;
}
export interface UserDto {
  id: string;
  phone: string;
  role: string;
  isActive: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly accessTokenKey = 'jwtToken';
  private readonly refreshTokenKey = 'refreshToken'
private readonly currentUserSubject =
  new BehaviorSubject<UserDto | null>(null);
  
currentUser$ = this.currentUserSubject.asObservable();

   constructor(private readonly apiService: ApiService) {}
  login(phone: string, password: string): Observable<UserDto> {
  return this.apiService
    .post<LoginResponse>('auth/login', { phone, password })
    .pipe(
      tap(response => {
        localStorage.setItem(this.accessTokenKey, response.token);
        localStorage.setItem(this.refreshTokenKey, response.refreshToken);
      }),
      switchMap(() => this.loadCurrentUser())
    );
}
  
    getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

   logout(): void {
  localStorage.removeItem(this.accessTokenKey);
  localStorage.removeItem(this.refreshTokenKey);
  this.currentUserSubject.next(null);
}


isLoggedIn(): Observable<boolean> {
  return this.currentUser$.pipe(
    map(user => !!user)
  );
}

  
  refreshToken(): Observable<LoginResponse> {
  const refreshToken = this.getRefreshToken();

  return this.apiService.post<LoginResponse>(
    'auth/refresh-token',
    { refreshToken }
  ).pipe(
    tap(response => {
      localStorage.setItem(this.accessTokenKey, response.token);
      localStorage.setItem(this.refreshTokenKey, response.refreshToken);
    })
  );
}
loadCurrentUser(): Observable<UserDto> {
  return this.apiService.get<UserDto>('users/me').pipe(
    tap(user => this.currentUserSubject.next(user))
  );
}


  
}
