import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeModule } from '../core/home/home.module';
import { HappeningModule } from '../happening/happening.module';
import { ParticipationHappeningModule } from '../participation-happening/participation-happening.module';
import { MatchMemberModule } from '../match-member/match-member.module';

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
          loadChildren: () => HomeModule,
        },
        {
          path: 'participation',
          loadChildren: () => ParticipationHappeningModule
        },
        {
          path: 'match',
          loadChildren: () => MatchMemberModule
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
    NavbarComponent,
    FooterComponent
  ],
  providers: [],
})

export class DashboardModule {
}
