import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  template_category,
  TemplateService,
} from '../../../../services/template.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './templates.component.html',
  styleUrl: './templates.component.scss',
})
export class TemplatesComponent implements OnInit, AfterViewInit {
  @ViewChild('templateList') templateList: ElementRef<any> | undefined;

  isSearchActive = false;
  searchValue: string | null = null;

  template_categories: Array<template_category & { isAtive: boolean }> = [
    {
      template_category_id: 0,
      name: 'All Templates',
      isAtive: true,
    },
  ];
  active_template_category_id = 0;

  templates: Array<any> = [
    {
      template_id: 1,
      icon_url:
        'https://icones.pro/wp-content/uploads/2021/02/icone-youtube5.png',
      name: 'AIDA Framework',
      description:
        'Impress potential employers with compelling job application emails that standout from the competition.',
      template_categories: [0, 1, 2],
    },
    {
      template_id: 1,
      icon_url:
        'https://icones.pro/wp-content/uploads/2021/02/icone-youtube5.png',
      name: 'Aidansoff Matrix',
      description:
        'Impress potential employers with compelling job application emails that standout from the competition.',
      template_categories: [0, 2],
    },
    {
      template_id: 2,
      icon_url:
        'https://midia.gruposinos.com.br/_midias/jpg/2018/05/20/icone_geolocalizacao-3440959.jpg',
      name: 'To-Do List',
      description:
        'Impress potential employers with compwith compelling job application emails that standout from the competition.elling job application emails that standout from the competition.',
      template_categories: [0, 2],
    },
    {
      template_id: 3,
      icon_url:
        'https://midia.gruposinos.com.br/_midias/jpg/2018/05/20/icone_geolocalizacao-3440959.jpg',
      name: 'To-Do List',
      description:
        'Impress potential employers with compelling job application emails that standout from with compelling job application emails that standout from the competition.with compelling job application emails that standout from the competition.the competition.',
      template_categories: [0, 2],
    },
    {
      template_id: 4,
      icon_url:
        'https://midia.gruposinos.com.br/_midias/jpg/2018/05/20/icone_geolocalizacao-3440959.jpg',
      name: 'To-Do List',
      description:
        'Impress potential employers with compelwith compelling job application emails that standout from the competition.with compelling job application emails that standout from the competition.with compelling job application emails that standout from the competition.with compelling job application emails that standout from the competition.ling job application emails that standout from the competition.',
      template_categories: [0, 2],
    },
    {
      template_id: 5,
      icon_url:
        'https://midia.gruposinos.com.br/_midias/jpg/2018/05/20/icone_geolocalizacao-3440959.jpg',
      name: 'To-Do List',
      description:
        'Impress potential employers with compelling job application emails that standout from the competition. with compelling job application emails that standout from the competition. with compelling job application emails that standout from the competition.',
      template_categories: [0, 2],
    },
    {
      template_id: 6,
      icon_url:
        'https://midia.gruposinos.com.br/_midias/jpg/2018/05/20/icone_geolocalizacao-3440959.jpg',
      name: 'To-Do List',
      description:
        'Impress potential employers with compelling job application emails that standout from the competition.with compelling job application emails that standout from the competition.with compelling job application emails that standout from the competition.',
      template_categories: [0, 2],
    },
  ];

  filteredTemplates: Array<any> = this.templates;

  viewMode: 'grid' | 'list' = 'grid';

  constructor(private templateService: TemplateService) {}

  ngOnInit(): void {
    this.templateService.list().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          res.data.map((template) => {
            this.template_categories.push({ ...template, isAtive: false });
          });
        }
      },
    });
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

  selectTemplate(template_category_id: number) {
    this.template_categories.map((template_category) => {
      template_category.isAtive =
        template_category.template_category_id === template_category_id;
    });
    this.active_template_category_id = template_category_id;
    this.applyFilters();
  }

  changeViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
    this.selectTemplate(0);
  }

  get templatesListMode() {
    const templatesList: Array<{
      template_category_id: number;
      templates: Array<any>;
    }> = [];

    this.template_categories.map((template_category) => {
      if (template_category.template_category_id == 0) return;
      const templates = this.filteredTemplates.filter((template) => {
        return template.template_categories.includes(
          template_category.template_category_id
        );
      });
      if (templates.length > 0) {
        templatesList.push({
          template_category_id: template_category.template_category_id,
          templates,
        });
      }
    });
    return templatesList;
  }

  templateCategoryName(template_category_id: number) {
    const template_category = this.template_categories.find(
      (template_category) => {
        return template_category.template_category_id === template_category_id;
      }
    );
    return template_category ? template_category.name : '';
  }

  applyFilters() {
    this.filteredTemplates = this.templates.filter((template) => {
      return template.template_categories.includes(
        this.active_template_category_id
      );
    });
    if (!this.searchValue) return;
    this.filteredTemplates = this.filteredTemplates.filter((template) => {
      return (
        template.name.toLowerCase().includes(this.searchValue!.toLowerCase()) ||
        template.description
          .toLowerCase()
          .includes(this.searchValue!.toLowerCase())
      );
    });
  }
}
