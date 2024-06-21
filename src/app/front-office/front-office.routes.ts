import { Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office.component';

export const routes: Routes = [
  {
    path: '',
    component: FrontOfficeComponent,
    children: [
      {
        path: 'invoices',
        loadComponent: () =>
          import('./invoices/invoices.component').then(
            (m) => m.InvoicesComponent
          ),
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'invoices',
      },
    ],
  },
];
