import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ApiReponse } from '../types/api.types';

export enum visibility {
  PUBLIC,
  PRIVATE,
  NOT_LISTED,
}

export type CreatingTemplateRequest = {
  logo_url: string;
  name: string;
  description: string;
  prompt: string;
  visibility: visibility;
  variables: [
    {
      name: string;
      value: string;
      placeholder: string;
      type: 'STRING' | 'TEXT';
      tip: string;
    },
  ];
  categories: number[];
};

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

  create(data: CreatingTemplateRequest) {
    return this.http.post(`${environment.apiUrl}/template`, data) as Observable<
      ApiReponse<template>
    >;
  }
}
