import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { HappeningModule } from '../happening/happening.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardPageComponent,
      children: [
        {
          path: 'happening',
          loadChildren: () => HappeningModule,
        },
      ]
    }
    ])
  ],
  declarations: [
    DashboardPageComponent,
  ],
  providers: [],
})

export class DashboardModule {
}
