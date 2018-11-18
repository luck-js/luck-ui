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
      description: [model.description],
      participantList: this.formBuilder.array([]),
    });
  }

  private createParticipant(name: string): FormGroup {
    return this.formBuilder.group({ name });
  }

  public get forParticipantList() {
    return this.form.get('participantList') as FormArray;
  }

  public removeParticipant(index: number){
    this.participantList.removeAt(index);
  }

  public addParticipant(target: HTMLInputElement): void {
    this.participantList = this.forParticipantList;
    this.participantList.push(this.createParticipant(target.value));
    target.value = "";
  }

  public clickedSave() {
    this.participantList = this.forParticipantList;

    this.createHappeningService.publishHappening(this.happeningId, this.form.value).pipe(
      tap((data) => this.router.navigate([`/happening/view/${this.happeningId}`])),
      tap((data) => console.log('CreateHappeningService.publishHappening -> CreatedHappening: ', data))
    )
      .subscribe();
  }

}
