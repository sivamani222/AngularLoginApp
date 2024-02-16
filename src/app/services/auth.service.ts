import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/auth';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  registerUser(userDetails: User) {
    return this.http.post(`${this.baseUrl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`).pipe(
      map((users: any[]) => {
        // Assuming the response contains an array of users, we'll take the first user
        const user = users[0];
        if (user && user.isAdmin !== undefined) {
          // If the user object has the isAdmin field, set it in session storage
          sessionStorage.setItem('isAdmin', user.isAdmin);
        }
        return users; // Return the array of users
      })
    );
  }

  isAdmin(): boolean {
    // Check if the logged-in user is an admin
    const isAdmin = sessionStorage.getItem('isAdmin');
    return isAdmin === 'true';
  }
}
