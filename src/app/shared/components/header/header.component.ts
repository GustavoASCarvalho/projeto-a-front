import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ChatgptApiKeyService } from '../../../services/chatgpt-api-key.service';
import { UserService } from '../../../services/user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('apikeyModal') apikeyModal!: ModalComponent;
  @ViewChild('toolTip', { static: false }) toolTip: ElementRef | undefined;
  @ViewChild('openToolTip', { static: false }) openToolTip:
    | ElementRef
    | undefined;

  name: string = '';
  photoUrl: string = '';
  toolTipOpen: boolean = false;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    api_key: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private chatgptApiKeyService: ChatgptApiKeyService
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

  openApiKeyModal() {
    this.apikeyModal.toggleModal();
    this.toggleToolTip();
  }

  handleSubmit() {
    console.log('a');
    if (this.form.invalid) return;
    console.log('b');
    console.log(this.form.value);
    this.chatgptApiKeyService
      .create(this.form.value.api_key!, this.form.value.name!)
      .subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.apikeyModal.toggleModal();
            this.form.reset();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
