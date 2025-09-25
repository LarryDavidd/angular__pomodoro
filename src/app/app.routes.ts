import { Routes } from '@angular/router';
import { MainPage } from './pages/main-page/main-page';

export const routes: Routes = [
  { path: '', component: MainPage },
  {
    path: 'timer',
    loadComponent: () =>
      import('./pages/timer-page/timer-page').then((m) => m.TimerPage),
  },
];
