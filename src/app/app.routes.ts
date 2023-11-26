import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { authGuard } from './shared/guards/auth.guard';
import { SigninComponent } from './modules/signin/signin.component';
import { SignupComponent } from './modules/signup/signup.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Home',
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: { hideHeader: false },
    title: 'Sign In',
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { hideHeader: false },
    title: 'Sign Up',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
