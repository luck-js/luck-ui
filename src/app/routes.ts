import {Routes} from '@angular/router';
// import {DashboardModule} from './dashboard/dashboard.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    // loadChildren: () => DashboardModule,
  }
];
