import { Routes } from '@angular/router';
import { ChatComponent } from './modules/chat/chat.component';
import { HomeComponent as RouterHomeComponent } from './modules/home/home.component';
import { HistoricComponent } from './modules/home/pages/historic/historic.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { TemplatesComponent } from './modules/home/pages/templates/templates.component';
import { SigninComponent } from './modules/signin/signin.component';
import { SignupComponent } from './modules/signup/signup.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: RouterHomeComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent, title: 'Home' },
      { path: 'history', component: HistoricComponent, title: 'History' },
      { path: 'templates', component: TemplatesComponent, title: 'Templates' },
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
