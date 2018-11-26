import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatchMemberPageComponent } from './match-member-page/match-member-page.component';
import { SpinnerComponent } from '../core/components/spinner/spinner.component';

import { MatchMemberService } from './match-member-page/match-member.service';
import { MatchMemberGuardService } from './match-member-page/match-member-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: '/:id', pathMatch: 'full' },
      {
        path: ':id',
        component: MatchMemberPageComponent,
        canActivate: [MatchMemberGuardService]
      }
    ]),
  ],
  declarations: [MatchMemberPageComponent, SpinnerComponent],
  providers: [
    MatchMemberService,
    MatchMemberGuardService
  ]
})
export class MatchMemberModule {
}
