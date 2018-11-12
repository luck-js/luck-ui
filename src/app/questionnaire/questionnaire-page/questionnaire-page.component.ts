import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuestionnaireService } from './questionnaire.service';
import { INIT_FORM_QUESTIONNAIRE, Questionnaire, QuestionnaireData, QuestionnaireId } from './questionnaire.model';

@Component({
  selector: 'lk-questionnaire-page',
  templateUrl: './questionnaire-page.component.html',
  styleUrls: ['./questionnaire-page.component.scss']
})
export class QuestionnairePageComponent implements OnInit {
  public happeningId: string;
  public formSend = true;

  public model: Questionnaire;
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private questionnaireService: QuestionnaireService) {
  }

  ngOnInit() {
    this.initForm({ ...INIT_FORM_QUESTIONNAIRE, ...this.model });
  }

  ngOnDestroy() {
  }

  private initForm(model: Questionnaire) {

    this.form = this.formBuilder.group({
      name: [model.name],
      email: [model.email],
      telephone: [model.telephone],
    });
  }

  public clickedSave() {
    this.formSend = false
    const data: any = Object.keys(this.form.value).reduce((obj, key) => {
      const id = QuestionnaireId[key];
      obj[id] = this.form.value[key];
      return obj;
    }, {});

    console.log(data)
    this.questionnaireService.send(data)
      .subscribe()
  }
}
