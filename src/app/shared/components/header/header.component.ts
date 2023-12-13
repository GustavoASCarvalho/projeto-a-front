import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  name: string = '';
  photoUrl: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.get().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.name = res.data.full_name!;
          this.photoUrl =
            res.data.photo_url ||
            'https://www.myany.city/sites/default/files/styles/scaled_cropped_medium__260x260/public/field/image/node-related-images/sample-dwight-k-schrute.jpg?itok=8TfRscbA';
        }
      },
    });
  }
}
