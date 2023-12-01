import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiReponse } from '../types/api.types';
import { environment } from '../../environments/environment';

export type template_category = {
  template_category_id: number;
  name: string;
};

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${environment.apiUrl}/template/list`) as Observable<
      ApiReponse<Array<template_category>>
    >;
  }
}
