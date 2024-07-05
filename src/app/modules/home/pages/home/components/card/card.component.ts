import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() icon_url: string | undefined;
  @Input() name: string | undefined;
  @Input() description: string | undefined;
  @Input() slug: string | undefined;

  constructor(private router: Router) {}
  redirectToChat() {
    this.router.navigate(['/chat', this.slug]);
  }
}
