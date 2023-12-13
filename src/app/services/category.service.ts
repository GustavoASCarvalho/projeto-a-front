import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiReponse } from '../types/api.types';

export type category = {
  category_id: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${environment.apiUrl}/category/list`) as Observable<
      ApiReponse<Array<category>>
    >;
  }
}
