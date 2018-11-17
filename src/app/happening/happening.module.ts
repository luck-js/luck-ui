import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

import { HappeningPageComponent } from './happening-page/happening-page.component';
import { NewHappeningPageComponent } from './new-happening-page/new-happening-page.component';
import { CreateHappeningPageComponent } from './create-happening-page/create-happening-page.component';

import { HappeningService } from './happening-page/happening.service';
import { NewHappeningPageService } from './new-happening-page/new-happening-page.service';
import { CreateHappeningService } from './create-happening-page/create-happening.service';

import { HappeningServiceGuardService } from './happening-page/happening-guard.service';
import { NewHappeningPageGuardService } from './new-happening-page/new-happening-page-guard.service';
import { CreateHappeningServiceGuardService } from './create-happening-page/create-happening-guard.service';
import { ApplicationWrapperComponent } from './components/application-wrapper/application-wrapper.component';

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
        component: CreateHappeningPageComponent,
        canActivate: [CreateHappeningServiceGuardService]
      },
      {
        path: 'view/:id',
        component: HappeningPageComponent,
        canActivate: [HappeningServiceGuardService]
      }
      ]),
    TextareaAutosizeModule
  ],
  declarations: [
    HappeningPageComponent,
    NewHappeningPageComponent,
    CreateHappeningPageComponent,
    ApplicationWrapperComponent
  ],
  providers: [
    HappeningService,
    NewHappeningPageService,
    CreateHappeningService,
    HappeningServiceGuardService,
    NewHappeningPageGuardService,
    CreateHappeningServiceGuardService
  ]
})
export class HappeningModule {
}
