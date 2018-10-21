import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { HappeningModule } from '../happening/happening.module';
import { ParticipationHappeningModule } from '../participation-happening/participation-happening.module';
import { MatchMemberPageModule } from '../match-member/match-member-page.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardPageComponent,
      children: [
        {
          path: ':id',
          loadChildren: () => ParticipationHappeningModule
        },
        {
          path: 'match',
          loadChildren: () => MatchMemberPageModule
        },
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
