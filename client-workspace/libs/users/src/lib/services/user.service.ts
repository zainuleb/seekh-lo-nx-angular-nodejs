import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  apiURLUsers = environment.apiURL + 'users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLUsers);
  }

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  }

  postUser(user: FormData): Observable<User> {
    return this.http.post<User>(this.apiURLUsers, user);
  }

  putUser(user: FormData, userId: string): Observable<User> {
    return this.http.put<User>(`${this.apiURLUsers}/${userId}`, User);
  }

  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`${this.apiURLUsers}/${userId}`);
  }
}
