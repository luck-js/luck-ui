import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  }
];
