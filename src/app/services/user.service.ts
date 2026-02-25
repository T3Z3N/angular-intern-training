import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }

  /** Get all users */
  getUsers(search = '', limit = 10, skip = 0) {
    if (search) {
      return this.http.get<any>(
        `https://dummyjson.com/users/search?q=${search}&limit=${limit}&skip=${skip}`
      );
    }

    return this.http.get<any>(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
  }

  /** Get user by id */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }
}
