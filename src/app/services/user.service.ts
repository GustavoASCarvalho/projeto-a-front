import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiReponse } from '../types/api.types';

export type User = {
  user_id: number;
  email: string;
  full_name: string | null;
  photo_url: string | null;
  password_hash: string | null;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${environment.apiUrl}/user`) as Observable<
      ApiReponse<User>
    >;
  }
}
