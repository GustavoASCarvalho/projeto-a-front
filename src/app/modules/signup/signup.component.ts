import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import getGoogleOAuthURL from '../../utils/getGoogleURL';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  googleOAuthURL = getGoogleOAuthURL();
  errorMessage = '';
  isLoading = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form.valueChanges.subscribe((_) => {
      this.errorMessage = '';
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.authService
        .register(
          this.form.controls.email.value!,
          this.form.controls.password.value!
        )
        .subscribe({
          next: (res) => {
            if (res.statusCode === 200) {
              this.authService.SetToken(res.data.jwe);
              this.router.navigateByUrl('/home');
            }
          },
          error: (error) => {
            console.log('error', error);
            this.errorMessage = `Something went wrong. Please try again later`;
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }
}
