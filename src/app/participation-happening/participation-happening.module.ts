import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ParticipationHappeningPageComponent } from './participation-happening/participation-happening-page.component';

import { ParticipationHappeningService } from './participation-happening/participation-happening.service';
import { ParticipationHappeningGuardService } from './participation-happening/participation-happening-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ParticipationHappeningPageComponent,
      canActivate: [ParticipationHappeningGuardService]
    }]),
  ],
  declarations: [ParticipationHappeningPageComponent],
  providers: [
    ParticipationHappeningService,
    ParticipationHappeningGuardService
  ]
})
export class ParticipationHappeningModule {
}
