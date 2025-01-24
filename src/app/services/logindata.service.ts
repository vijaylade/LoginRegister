import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

export interface User {
  id?: number; // Optional id
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LogindataService {

  constructor(private http: HttpClient) { }

  userurl = 'http://localhost:3000/user'

  // Get users - returns an array of users
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.userurl);
  }

  // Add a new user
  addUsers(data: User): Observable<User> {
    return this.http.post<User>(this.userurl, data);
  }

 // Authenticate user (login)
 loginUser(email: string, password: string): Observable<User | null> {
  return this.http.get<User[]>(`${this.userurl}`).pipe(
    map((users: User[]) =>
      users.find((user) => user.email === email && user.password === password) || null
    )
  );
  
}


}
