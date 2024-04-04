import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('toolTip', { static: false }) toolTip: ElementRef | undefined;
  @ViewChild('openToolTip', { static: false }) openToolTip:
    | ElementRef
    | undefined;

  name: string = '';
  photoUrl: string = '';
  toolTipOpen: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

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

  ngAfterViewInit(): void {
    document.addEventListener('click', (e) => {
      if (this.toolTipOpen && this.toolTip && this.openToolTip) {
        if (
          !this.toolTip.nativeElement.contains(e.target) &&
          !this.openToolTip.nativeElement.contains(e.target)
        ) {
          this.toolTipOpen = false;
        }
      }
    });
  }

  toggleToolTip() {
    this.toolTipOpen = !this.toolTipOpen;
  }

  logout() {
    this.authService.logout();
  }
}
