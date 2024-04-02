import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() title: string = '';
  @Input() icon_url: string = '';

  isOpen: boolean = true;

  @Output() onClickSideBar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  onClose() {
    this.router.navigate(['/home']);
  }

  onSideBar() {
    this.isOpen = !this.isOpen;
    this.onClickSideBar.emit(this.isOpen);
  }
}
