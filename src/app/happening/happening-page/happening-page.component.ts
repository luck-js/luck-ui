import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WINDOW } from '../../app.module';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ParticipantUniqueLinkData, ParticipantUniqueLinkDataView} from './happening.model';
import { HappeningService } from './happening.service';
import { AppStateService } from '../../core/app-state.service';

declare const ga: any;

@Component({
  selector: 'lk-happening-page',
  templateUrl: './happening-page.component.html',
  styleUrls: ['./happening-page.component.scss']
})

export class HappeningPageComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public isDescription = false;
  public name = '';
  public description = '';
  public participantsUniqueLink: ParticipantUniqueLinkDataView[] = [];

  constructor(
    @Inject(WINDOW) private window: Window,
    private happeningService: HappeningService,
    private appStateService: AppStateService) {
  }

  ngOnInit() {
    ga(() => {
      ga('send', 'event', 'Application', 'display happening', (<any>window).location.href);
    });

    this.happeningService.createdHappeningSubject.pipe(
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe((created) => {
        this.participantsUniqueLink = created ? mapToViewModel(created.participants) : [];
        this.name = created ? created.name : '';
        this.description = created ? created.description : '';

        this.isDescription = this.checkIsDescriptionEmpty(this.name, this.description);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getHost(): string {
    return this.window.location.host;
  }

  private checkIsDescriptionEmpty(name: string, description: string) : boolean{
    return name !== '' && description !== ''
  }


  public getValue(id: string): string {
    return `http://${this.getHost()}/#/participation/${id}`;
  }

  public copyValue(target: HTMLInputElement) {
    target.select();
    document.execCommand('copy');
    this.appStateService.showModalityText('skopiowano !');
  }

  public provoked(event: Event) {
    event.preventDefault();
  }

  public returnValue(target: HTMLInputElement, index) {
    const {uniqueLink} = this.participantsUniqueLink[index];
    this.participantsUniqueLink[index].copied = true;
    const originValue = this.getValue(uniqueLink);
    target.value = target.value !== originValue ? originValue : target.value;
  }

  public mouseUp(index){
    console.log('mouseUp', index, this.participantsUniqueLink);
    this.participantsUniqueLink[index].copied = true;
  }
}

function mapToViewModel(participantUniqueLinkData: ParticipantUniqueLinkData[]): ParticipantUniqueLinkDataView[] {
  const copied = false;
  return participantUniqueLinkData.map(el => Object.assign({}, el, { copied }));
}
