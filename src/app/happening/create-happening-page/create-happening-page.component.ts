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

interface PlaceholderTexts {
  name: string;
  description: string;
  participants: string;
}

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
  public isPublishing = false;

  public placeholderTexts: PlaceholderTexts = this.getPlaceholderTexts().mobile;

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
    this.initPlaceholderTexts();
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

  private initPlaceholderTexts() {
    if (this.isMobileWidth()) {
      this.placeholderTexts = this.getPlaceholderTexts().mobile;
    } else {
      this.placeholderTexts = this.getPlaceholderTexts().rest;
    }
  }

  private getPlaceholderTexts(): { mobile: PlaceholderTexts; rest: PlaceholderTexts } {
    return {
      mobile: {
        name: 'Np. Mikołajki 2018',
        description: 'Np. do jakiej kwoty kupujemy prezenty,  do kiedy mamy czas i gdzie się spotykamy na obdarowanie prezentami.',
        participants: 'Będą dwie Anie? Wyróżnij je!',
      },
      rest: {
        name: 'Np. Mikołajki 2018',
        description: 'Np. „Cześć, zapraszam Was do mikołajkowego losowania z aplikacją Luck. Prezenty wręczymy sobie 6 grudnia, podczas spotkania w naszej ulubionej restauracji Bajka. Maksymalna kwota, za którą kupujemy prezenty to 100 zł.”',
        participants: 'Jeżeli wśród znajomych są dwie Anie, może zacznij od nazwiska?',
      }
    };
  }

  private isMobileWidth(): boolean {
    return this.getStaticWidthForAppContainer() < 500;
  }

  private getStaticWidthForAppContainer(): number {
    return Number(window.innerWidth);
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

  public onClickButton(target: HTMLInputElement): void {
    target.focus();
    this.addParticipant(target);
  }

  public addParticipant(target: HTMLInputElement): void {
    if (isEmpty(target.value)) {
      this.appStateService.showModalityText('Wpisz nazwę uczestnika');

    } else {

      this.participantList = this.forParticipantList;
      this.participantList.insert(0, this.createParticipant(target.value));
      target.value = '';
    }
  }

  public clickedSave() {
    if (!this.form.valid) {
      this.appStateService.showModalityText('Nie odpowiednia liczba uczestników');

    } else if (this.isPublishing) {
      this.appStateService.showModalityText('Poczekaj na przeładowanie strony');

    } else {
      this.isPublishing = true;
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

  public getButtonClass(): string {
    let init = 'lk-button outline spinner';

    if (!this.form.valid && !this.isPublishing) {
      init += ' disabled';

    } else if (this.isPublishing) {
      init += ' loading';
    }

    return init;
  }

}

function isEmpty(str) {
  return !str.replace(/\s+/, '').length;
}
