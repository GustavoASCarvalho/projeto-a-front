import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import {
  CategoryService,
  category,
} from '../../../../services/category.service';
import {
  TemplateService,
  template,
} from '../../../../services/template.service';
import { CardComponent } from './components/card/card.component';
import { CategoryButtonComponent } from './components/category-button/category-button.component';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, CategoryButtonComponent],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent implements OnInit, AfterViewInit {
  @ViewChild('templateList') templateList: ElementRef<any> | undefined;

  isSearchActive = false;
  isLoading = false;
  searchValue: string | null = null;

  categories: Array<category & { isAtive: boolean }> = [
    {
      category_id: 0,
      name: 'All Templates',
      isAtive: true,
    },
  ];
  active_category_id = 0;

  templates: Array<template> = [];

  filteredTemplates: Array<template> = this.templates;

  viewMode: 'grid' | 'list' = 'grid';

  constructor(
    private categoryService: CategoryService,
    private templateService: TemplateService
  ) {}

  ngOnInit(): void {
    const categoryObservable = this.categoryService.list();
    const templateObservable = this.templateService.list();

    forkJoin([categoryObservable, templateObservable]).subscribe(
      ([categoryRes, templateRes]) => {
        if (categoryRes.statusCode === 200) {
          categoryRes.data.map((category) => {
            this.categories.push({ ...category, isAtive: false });
          });
        }

        if (templateRes.statusCode === 200) {
          templateRes.data.map((template) => {
            this.templates.push(template);
          });
          this.applyFilters();
        }

        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    if (this.templateList) {
      this.templateList.nativeElement.addEventListener(
        'wheel',
        (event: WheelEvent) => {
          if (event.deltaY > 0) {
            this.templateList!.nativeElement.scrollLeft += 250;
          } else {
            this.templateList!.nativeElement.scrollLeft -= 250;
          }
          event.preventDefault();
        }
      );
    }
  }

  selectTemplate(category_id: number) {
    this.categories.map((category) => {
      category.isAtive = category.category_id === category_id;
    });
    this.active_category_id = category_id;
    this.applyFilters();
  }

  changeViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.selectTemplate(0);
  }

  get templatesListMode(): Array<{
    category_id: number;
    templates: Array<template>;
  }> {
    const templatesList: Array<{
      category_id: number;
      templates: Array<template>;
    }> = [];

    for (const category of this.categories) {
      if (category.category_id === 0) continue;

      const templates = this.filteredTemplates.filter((template) => {
        return template.categories_on_template.some(
          (cat) => cat.category_id === category.category_id
        );
      });

      if (templates.length > 0) {
        templatesList.push({
          category_id: category.category_id,
          templates,
        });
      }
    }

    return templatesList;
  }

  categoryName(category_id: number) {
    const category = this.categories.find((category) => {
      return category.category_id === category_id;
    });
    return category ? category.name : '';
  }

  applyFilters(): void {
    this.filteredTemplates = this.templates.filter((template) => {
      return (
        this.active_category_id === 0 ||
        template.categories_on_template.some(
          (cat) => cat.category_id === this.active_category_id
        )
      );
    });

    if (!this.searchValue) return;

    const lowerCaseSearchValue = this.searchValue.toLowerCase();
    this.filteredTemplates = this.filteredTemplates.filter((template) => {
      return (
        template.name.toLowerCase().includes(lowerCaseSearchValue) ||
        template.description.toLowerCase().includes(lowerCaseSearchValue)
      );
    });
  }
}
