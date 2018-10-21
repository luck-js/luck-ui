import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HappeningPageComponent } from './happening-page/happening-page.component';
import { NewHappeningPageComponent } from './new-happening-page/new-happening-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewHappeningPageComponent
      },
      {
        path: ':id',
        component: HappeningPageComponent,
      }]),
  ],
  declarations: [
    HappeningPageComponent,
    NewHappeningPageComponent
  ],
  providers: []
})
export class HappeningModule {
}
