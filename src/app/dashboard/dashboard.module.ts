import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

import { NavbarComponent } from './dashboard-page/navbar/navbar.component';
import { FooterComponent } from './dashboard-page/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: DashboardPageComponent,
      children: [
        // {path: '', redirectTo: '', pathMatch: 'full'},
        {
          path: '',
          loadChildren: '../core/home/home.module#HomeModule',
        },
        {
          path: 'participation',
          loadChildren: '../participation-happening/participation-happening.module#ParticipationHappeningModule'
        },
        {
          path: 'match',
          loadChildren: '../match-member/match-member.module#MatchMemberModule'
        },
        {
          path: 'happening',
          loadChildren: '../happening/happening.module#HappeningModule'
        },
      ]
    }
    ])
  ],
  declarations: [
    DashboardPageComponent,
    NavbarComponent,
    FooterComponent
  ],
  providers: [],
})

export class DashboardModule {
}
