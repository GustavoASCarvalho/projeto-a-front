import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiReponse } from '../types/api.types';
import { Message } from '../types/message.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  create(data: {
    slug: string;
    chat_gpt_api_key_id: number;
    conversation_id: number;
    message: string;
  }) {
    return this.http.post(`${environment.apiUrl}/message`, {
      ...data,
    }) as Observable<ApiReponse<Message>>;
  }
}
