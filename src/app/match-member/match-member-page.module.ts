import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchMemberPageComponent} from './match-member-page/match-member-page.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', redirectTo: '/:id', pathMatch: 'full'},
      {
        path: ':id',
        component: MatchMemberPageComponent
      }
    ]),
  ],
  declarations: [MatchMemberPageComponent],
  providers: []
})
export class MatchMemberPageModule {
}
