import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';

export const routes: Routes = [
  { path: '', component: MainPage },
  {
    path: 'timer',
    loadComponent: () =>
      import('./pages/timer-page/timer-page').then((m) => m.TimerPage),
  },
  { component: LoginComponent, path: 'signin' },
  { component: SignUpComponent, path: 'signup' },
];
