import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';


export interface UserDto {
  id: string;
  phone: string;
  email: string;
  role: string;
  isActive: boolean;
  profile?: ProfileDto;
}

export interface ProfileDto {
  fullName: string;
  bio?: string;
  profileImageUrl?: string;
  birthDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
   private readonly apiService = inject(ApiService);

    private currentUserSubject = new BehaviorSubject<UserDto | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  
  loadCurrentUser(): Observable<UserDto> {
    return this.apiService.get<UserDto>('users/me').pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  
  getUserById(userId: string): Observable<UserDto> {
    return this.apiService.get<UserDto>(`users/${userId}`);
  }

  
  getAllUsers(): Observable<UserDto[]> {
    return this.apiService.get<UserDto[]>('users/all-users');
  }

  
  getUsersPaged(
    pageNumber: number,
    pageSize: number,
    search?: string,
    sortBy?: string,
    ascending?: boolean
  ): Observable<{ items: UserDto[]; totalCount: number }> {
    let query = `all-users?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (search) query += `&search=${search}`;
    if (sortBy) query += `&sortBy=${sortBy}&ascending=${ascending ?? true}`;
    return this.apiService.get<{ items: UserDto[]; totalCount: number }>(query);
  }

 
  updateUser(userId: string, updateData: Partial<UserDto>): Observable<UserDto> {
    return this.apiService.put<UserDto>(`users/${userId}`, updateData);
  }

  
  setCurrentUser(user: UserDto | null) {
    this.currentUserSubject.next(user);
  }

}
