import { Routes } from '@angular/router';
import { ChatComponent } from './modules/chat/chat.component';
import { HomeComponent } from './modules/home/home.component';
import { BComponent } from './modules/home/pages/b/b.component';
import { HistoricComponent } from './modules/home/pages/historic/historic.component';
import { TemplatesComponent } from './modules/home/pages/templates/templates.component';
import { CreateComponent } from './modules/prompts/pages/create/create.component';
import { PromptsComponent } from './modules/prompts/prompts.component';
import { SigninComponent } from './modules/signin/signin.component';
import { SignupComponent } from './modules/signup/signup.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
    title: 'Home',
    children: [
      { path: '', component: TemplatesComponent, title: 'A' },
      { path: 'history', component: HistoricComponent, title: 'History' },
      { path: 'c', component: BComponent, title: 'C' },
    ],
  },
  {
    path: 'prompts',
    component: PromptsComponent,
    canActivate: [authGuard],
    title: 'Prompts',
  },
  {
    path: 'prompts/new',
    component: CreateComponent,
    canActivate: [authGuard],
    title: 'New Prompt',
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
    data: { hideHeader: true },
    title: 'Sign In',
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { hideHeader: true },
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
