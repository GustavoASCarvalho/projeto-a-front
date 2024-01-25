import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './copy.component.html',
  styleUrl: './copy.component.scss',
})
export class CopyComponent {
  @Input() text: string = '';

  copy() {
    navigator.clipboard.writeText(this.text);
  }
}
