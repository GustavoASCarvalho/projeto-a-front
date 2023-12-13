import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { authGuard } from './shared/guards/auth.guard';
import { SigninComponent } from './modules/signin/signin.component';
import { SignupComponent } from './modules/signup/signup.component';
import { TemplatesComponent } from './modules/home/pages/templates/templates.component';
import { BComponent } from './modules/home/pages/b/b.component';
import { ChatComponent } from './modules/chat/chat.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Home',
    children: [
      { path: '', component: TemplatesComponent, title: 'A' },
      { path: 'history', component: BComponent, title: 'History' },
      { path: 'c', component: BComponent, title: 'C' },
    ],
  },
  {
    path: 'chat/:slug',
    component: ChatComponent,
    canActivate: [authGuard],
    title: 'Chat',
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
