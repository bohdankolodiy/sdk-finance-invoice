import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'front-office',
    loadChildren: () =>
      import('./front-office/front-office.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'front-office',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'front-office',
  },
];
