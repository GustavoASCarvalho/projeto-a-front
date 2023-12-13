import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() name: string | null = null;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  clearInputs() {
    this.onClick.emit();
  }
}
