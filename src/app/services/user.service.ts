import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserListResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  /** Get all users */
  getUsers(limit = 10, skip = 0): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(
      `${this.baseUrl}?limit=${limit}&skip=${skip}`,
    );
  }

  /** Get user by id */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
