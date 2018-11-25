import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {filter, takeUntil, tap} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ParticipationHappeningService } from './participation-happening.service';
import {IHappeningView, IParticipationHappening, PARTICIPATION_HAPPENING_MOCK} from './participation-happening.model';

@Component({
  selector: 'lk-participation-happening-page',
  templateUrl: './participation-happening-page.component.html',
  styleUrls: ['./participation-happening-page.component.scss']
})

export class ParticipationHappeningPageComponent implements OnInit, OnDestroy {
  public happeningId: string;
  public isDescription = false;
  public participationHappening: IParticipationHappening = PARTICIPATION_HAPPENING_MOCK;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private participationHappeningService: ParticipationHappeningService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((params) => this.happeningId = params['id']);

    this.participationHappeningService.participationHappeningSubject.pipe(
      takeUntil(this.ngUnsubscribe),
      filter((data) => data.member !== undefined),
      tap(participationHappening => this.isDescription = this.checkIsDescriptionEmpty(participationHappening.happening)),
      tap(participationHappening => this.participationHappening = participationHappening)
    )
      .subscribe();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private checkIsDescriptionEmpty(happeningView: IHappeningView) : boolean{
    return happeningView.name !== '' && happeningView.description !== ''
  }

}
