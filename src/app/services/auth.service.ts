import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Cookie from 'js-cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/authenticate`, {
      email,
      password,
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      email,
      password,
    });
  }

  logout(): void {
    Cookie.remove('token');
    this.router.navigateByUrl('/signin');
  }

  isLogged(): Observable<any> {
    const token = Cookie.get('token');
    console.log('token', token);
    if (!Cookie.get('token')) {
      return new Observable((observer) => {
        observer.next(false);
      });
    }
    return this.http.get(`${environment.apiUrl}/auth/verify`);
  }

  SetToken(token: string): void {
    Cookie.set('token', token, { expires: 1 / 3 });
  }

  GetToken(): string {
    return Cookie.get('token') || '';
  }
}
