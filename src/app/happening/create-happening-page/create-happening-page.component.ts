import { Component, OnInit, OnDestroy } from '@angular/core';
import { Happening, INIT_FORM_HAPPENING } from '../happening-page/happening.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { AppStateService } from '../../core/app-state.service';
import { CreateHappeningService } from './create-happening.service';
import { NewHappeningPageService } from '../new-happening-page/new-happening-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CustomValidation } from './custom-validation';

@Component({
  selector: 'lk-create-happening-page',
  templateUrl: './create-happening-page.component.html',
  styleUrls: ['./create-happening-page.component.scss']
})

export class CreateHappeningPageComponent implements OnInit, OnDestroy {
  public happeningId: string;

  public model: Happening;
  public form: FormGroup;
  public participantList: FormArray;

  public name = '';
  public description = '';

  public isSwitched = true;

  private max = 2;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private appStateService: AppStateService,
    private createHappeningService: CreateHappeningService,
    private newHappeningPageService: NewHappeningPageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((params) => this.happeningId = params['id']);

    this.initForm({ ...INIT_FORM_HAPPENING, ...{ name: this.appStateService.nameHappening }, ...this.model });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private initForm(model: Happening) {

    this.form = this.formBuilder.group({
      name: [model.name],
      organiserName: [model.organiserName],
      description: [model.description],
      participantList: this.formBuilder.array([], CustomValidation.checkArrayLimit(3, 40)),
    });
  }

  private createParticipant(name: string): FormGroup {
    return this.formBuilder.group({ name });
  }

  public get forParticipantList() {
    return this.form.get('participantList') as FormArray;
  }

  public removeParticipant(index: number) {
    this.participantList.removeAt(index);
  }

  public addParticipant(target: HTMLInputElement): void {
    this.participantList = this.forParticipantList;
    this.participantList.insert(0, this.createParticipant(target.value));
    target.value = '';
  }

  public clickedSave() {
    if(!this.form.valid){
      this.appStateService.showModalityText('Nie odpowiednia liczba uczestników');

    } else {
      this.participantList = this.forParticipantList;

      this.createHappeningService.publishHappening(this.happeningId, this.form.value).pipe(
        tap((data) => this.router.navigate([`/happening/view/${this.happeningId}`])),
        tap((data) => console.log('CreateHappeningService.publishHappening -> CreatedHappening: ', data))
      )
        .subscribe();
    }
  }

  public onSwitchChange(target: HTMLInputElement) {
    this.isSwitched = target.checked;
  };

}
