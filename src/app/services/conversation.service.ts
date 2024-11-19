import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiReponse } from '../types/api.types';
import { Conversation } from '../types/conversation.type';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  constructor(private http: HttpClient) {}

  create(data: {
    slug: string;
    chat_gpt_api_key_id: number;
    variables: Array<{
      name: string;
      realName: string;
      value: string;
    }>;
  }) {
    return this.http.post(`${environment.apiUrl}/conversation`, {
      ...data,
    }) as Observable<ApiReponse<Conversation>>;
  }

  list() {
    return this.http.get(`${environment.apiUrl}/conversation`) as Observable<
      ApiReponse<Array<Conversation>>
    >;
  }
}
