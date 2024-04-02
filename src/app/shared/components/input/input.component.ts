import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() type: 'TEXT' | 'STRING' = 'TEXT';
  @Input() placeholder: string = '';
  @Input() maxlength: number = 100;

  public formControl: FormControl = new FormControl();

  get currentValue(): string {
    if (this.formControl.value === null) return '00';
    return this.formControl.value.length < 10
      ? `0` + this.formControl.value.length
      : this.formControl.value.length;
  }

  writeValue(value: any) {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: Function) {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }

  registerOnTouched(fn: Function) {
    this.formControl.valueChanges.subscribe((val) => fn(val));
  }
}
