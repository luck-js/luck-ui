import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ParticipationHappeningService } from './participation-happening.service';
import { IParticipationHappening } from './participation-happening.model';

@Component({
  selector: 'lk-participation-happening-page',
  templateUrl: './participation-happening-page.component.html',
  styleUrls: ['./participation-happening-page.component.scss']
})
export class ParticipationHappeningPageComponent implements OnInit, OnDestroy {
  public participationHappening: IParticipationHappening;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private participationHappeningService: ParticipationHappeningService) {
  }

  ngOnInit() {
    this.participationHappeningService.participationHappeningSubject.pipe(
      takeUntil(this.ngUnsubscribe),
    )
      .subscribe((participationHappening) => this.participationHappening = participationHappening);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
