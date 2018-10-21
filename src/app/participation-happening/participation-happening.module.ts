import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ParticipationHappeningPageComponent } from './participation-happening/participation-happening-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ParticipationHappeningPageComponent
    }]),
  ],
  declarations: [ParticipationHappeningPageComponent],
  providers: []
})
export class ParticipationHappeningModule {
}
