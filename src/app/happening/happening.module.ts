import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HappeningPageComponent } from './happening-page/happening-page.component';
import { NewHappeningPageComponent } from './new-happening-page/new-happening-page.component';

import { HappeningService } from './happening-page/happening.service';
import { NewHappeningPageService } from './new-happening-page/new-happening-page.service';
import { NewHappeningPageGuardService } from './new-happening-page/new-happening-page-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewHappeningPageComponent,
        canActivate: [NewHappeningPageGuardService]
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
  providers: [
    HappeningService,
    NewHappeningPageService,
    NewHappeningPageGuardService
  ]
})
export class HappeningModule {
}
