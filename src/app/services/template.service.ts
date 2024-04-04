import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiReponse } from '../types/api.types';
import { environment } from '../../environments/environment';

export enum visibility {
  PUBLIC,
  PRIVATE,
  NOT_LISTED,
}

export type template = {
  template_id: number;
  slug: string;
  user_id: number;
  name: string;
  description: string;
  prompt: string;
  visibility: visibility.PUBLIC;
  created_at: Date;
  updated_at: Date;
  template_history: [
    {
      template_history_id: number;
      name: string;
      description: string;
      prompt: string;
      visibility: visibility.PUBLIC;
      created_at: Date;
      template_id: number;
      variables: [
        {
          name: string;
          placeholder: string;
          template_history_id: number;
          template_id: null;
          tip: string;
          type: 'TEXT' | 'STRING';
          variable_id: number;
        },
      ];
    },
  ];
  categories_on_template: [
    {
      category_id: number;
      template_id: number;
      category: {
        category_id: number;
        name: string;
      };
    },
  ];
};

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${environment.apiUrl}/template`) as Observable<
      ApiReponse<Array<template>>
    >;
  }

  getBySlug(slug: string) {
    return this.http.get(
      `${environment.apiUrl}/template/${slug}`,
    ) as Observable<ApiReponse<template>>;
  }
}
