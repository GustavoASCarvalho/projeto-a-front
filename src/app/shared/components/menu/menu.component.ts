import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  name: string = '';
  photoUrl: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.get().subscribe({
      next: (res) => {
        if (res.statusCode === 200) {
          this.name = res.data.full_name!;
          this.photoUrl = res.data.photo_url!;
        }
      },
    });
  }
}
