import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HappeningPageComponent } from './happening-page/happening-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: HappeningPageComponent
    }]),
  ],
  declarations: [
    HappeningPageComponent
  ],
  providers: []
})
export class HappeningModule {
}
