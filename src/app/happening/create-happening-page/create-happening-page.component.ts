import { Component, OnInit, OnDestroy } from '@angular/core';
import { Happening, INIT_FORM_HAPPENING, ParticipantUniqueLinkData } from '../happening-page/happening.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { AppStateService } from '../../core/app-state.service';
import { CreateHappeningService } from './create-happening.service';
import { NewHappeningPageService } from '../new-happening-page/new-happening-page.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

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
  public participantUniqueLinkData: ParticipantUniqueLinkData[] = [];

  private max = 2;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private appStateService: AppStateService,
    private createHappeningService: CreateHappeningService,
    private newHappeningPageService: NewHappeningPageService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

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
      description: [model.description],
      participantList: this.formBuilder.array([this.createParticipant()]),
    });
  }

  private createParticipant(): FormGroup {
    return this.formBuilder.group({
      name: '',
    });
  }

  private clearEmpty() {
    this.participantList = this.forParticipantList;
    this.participantList.controls.forEach((participant, index) => {
      if (participant.value.name === '' && this.participantList.length !== index + 1) {
        this.participantList.removeAt(index);
      }
    });
  }

  public get forParticipantList() {
    return this.form.get('participantList') as FormArray;
  }

  public addParticipant(event: any, i): void {
    this.clearEmpty();

    if (event.target.value === '') {
      return;
    }

    this.participantList = this.forParticipantList;

    if (this.participantList.length === i) {
      ++this.max;
      this.participantList.push(this.createParticipant());
    }
  }

  public clickedSave() {
    this.participantList = this.forParticipantList;
    const index = this.participantList.length - 1;
    if (this.participantList.controls[index].value.name === '') {
      this.participantList.removeAt(index);
    }

    this.createHappeningService.publishHappening(this.happeningId, this.form.value).pipe(
      tap((data) => this.router.navigate([`/happening/view/${this.happeningId}`])),
      tap((data) => console.log('CreateHappeningService.publishHappening -> CreatedHappening: ', data))
    )
      .subscribe();
  }

}
