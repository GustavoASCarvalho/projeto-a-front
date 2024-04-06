import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import {
  CreatingTemplateRequest,
  TemplateService,
} from '../../../../services/template.service';
import { HeaderComponent } from '../../components/header/header.component';

type Variable = {
  name: string;
  value: string;
  placeholder: string;
  type: 'STRING' | 'TEXT';
  tip: string;
};

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef<any> | undefined;

  categories: any[] = [];

  isLoading = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    logo_url: new FormControl(
      'https://www.nbc.com/sites/nbcblog/files/styles/scale_862/public/2023/07/rainn-wilson-the-office2.jpg',
      [Validators.required],
    ),
    description: new FormControl('', [Validators.required]),
    prompt: new FormControl('', [Validators.required]),
    visibility: new FormControl('PRIVATE', [Validators.required]),
    variables: new FormArray([]),
    categories: new FormArray([]),
  });

  constructor(
    private categoryService: CategoryService,
    private templateService: TemplateService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryService.list().subscribe((data) => {
      data.data.map((category) => {
        this.categories.push({ ...category, selected: false });
      });
    });
  }

  selectCategory(category: {
    category_id: number;
    selected: boolean;
    name: string;
  }) {
    const categoryFinded = this.categories.find(
      (c) => c.category_id === category.category_id,
    );
    if (categoryFinded) {
      categoryFinded.selected = !categoryFinded.selected;
      if (!categoryFinded.selected) {
        this.categoriesForm.removeAt(
          this.categoriesForm.controls.indexOf(categoryFinded),
        );
      } else {
        this.categoriesForm.push(new FormControl(category.category_id));
      }
    }
  }

  onInput(value: string) {
    const regex = /\{\{(\w+)\}\}/g;
    const matches = value.match(regex);
    const oldVariables = [...this.variables.controls];
    this.variables.controls = [];
    if (matches) {
      matches.map((match, i) => {
        const variable = match.slice(2, -2);
        if (oldVariables[i]) {
          oldVariables[i].get('value')?.setValue(variable);
          this.variables.push(oldVariables[i]);
        } else {
          this.addVariable({
            name: '',
            value: variable,
            placeholder: '',
            type: 'STRING',
            tip: '',
          });
        }
      });
    }
  }

  selectVisibility(value: string) {
    console.log(value);
    this.form.get('visibility')?.setValue(value);
  }

  maskMaxLength(value: string, maxLength: number) {
    return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
  }

  handleSubmit() {
    console.log(this.form.value);

    if (!this.form.valid) {
      return;
    }

    this.isLoading = true;

    this.templateService
      .create(this.form.value as unknown as CreatingTemplateRequest)
      .subscribe((data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/']);
      });
  }

  get variables() {
    return this.form.get('variables') as FormArray;
  }

  get categoriesForm() {
    return this.form.get('categories') as FormArray;
  }

  variableByIndex(index: number) {
    return this.variables.controls[index] as FormGroup;
  }

  variableNameByIndex(index: number) {
    return this.variableByIndex(index).get('name') as FormControl;
  }

  variablePlaceholderByIndex(index: number) {
    return this.variableByIndex(index).get('placeholder') as FormControl;
  }

  variableTypeByIndex(index: number) {
    return this.variableByIndex(index).get('type') as FormControl;
  }

  variableTipByIndex(index: number) {
    return this.variableByIndex(index).get('tip') as FormControl;
  }

  addVariable(
    data: Variable = {
      name: '',
      value: '',
      placeholder: '',
      type: 'STRING',
      tip: '',
    },
  ) {
    this.variables.push(
      new FormGroup({
        name: new FormControl(data.name, [Validators.required]),
        value: new FormControl(data.value, [Validators.required]),
        placeholder: new FormControl(data.placeholder, [Validators.required]),
        type: new FormControl(data.type, [Validators.required]),
        tip: new FormControl(data.tip, [Validators.required]),
      }),
    );
  }
}
