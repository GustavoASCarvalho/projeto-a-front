import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() icon_url: string = '';

  isOpen: boolean = true;

  @Output() onClickSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onClickClose: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.onClickClose.emit();
  }

  onSideBar() {
    this.isOpen = !this.isOpen;
    this.onClickSideBar.emit(this.isOpen);
  }
}
