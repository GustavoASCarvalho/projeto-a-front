import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import Cookie from 'js-cookie';
import { ApiReponse } from '../types/api.types';

export type loginResponse = {
  jwe: string;
};

export type registerResponse = {
  jwe: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/authenticate`, {
      email,
      password,
    }) as Observable<ApiReponse<loginResponse>>;
  }

  register(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      email,
      password,
    }) as Observable<ApiReponse<registerResponse>>;
  }

  logout(): void {
    Cookie.remove('token');
    this.router.navigateByUrl('/signin');
  }

  isLogged(): Observable<false | ApiReponse<any>> {
    const token = Cookie.get('token');

    if (!Cookie.get('token')) {
      return new Observable((observer) => {
        observer.next(false);
      });
    }
    return this.http.get(`${environment.apiUrl}/auth/verify`) as Observable<
      ApiReponse<any>
    >;
  }

  SetToken(token: string): void {
    Cookie.set('token', token, { expires: 1 / 3 });
  }

  GetToken(): string {
    return Cookie.get('token') || '';
  }
}
