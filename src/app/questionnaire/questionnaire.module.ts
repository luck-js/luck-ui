import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnairePageComponent } from './questionnaire-page/questionnaire-page.component';

import { QuestionnaireService } from './questionnaire-page/questionnaire.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{
      path: '',
      component: QuestionnairePageComponent
    }
    ])
  ],
  declarations: [QuestionnairePageComponent],
  providers: [QuestionnaireService],
})
export class QuestionnaireModule { }
