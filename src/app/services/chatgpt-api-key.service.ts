import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiReponse } from '../types/api.types';

export type chatgpt_api_key = {
  chatgpt_api_key_id: number;
  user_id: number;
  name: string;
  created_at: string;
};

@Injectable({
  providedIn: 'root',
})
export class ChatgptApiKeyService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${environment.apiUrl}/chatgpt-api-key`) as Observable<
      ApiReponse<Array<chatgpt_api_key>>
    >;
  }

  create(api_key: string, name: string) {
    return this.http.post(`${environment.apiUrl}/chatgpt-api-key`, {
      api_key,
      name,
    }) as Observable<ApiReponse<chatgpt_api_key>>;
  }
}
