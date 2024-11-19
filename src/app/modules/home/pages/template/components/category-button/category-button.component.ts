import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-button.component.html',
  styleUrl: './category-button.component.scss',
})
export class CategoryButtonComponent {
  @Input() name: string | undefined;
}
