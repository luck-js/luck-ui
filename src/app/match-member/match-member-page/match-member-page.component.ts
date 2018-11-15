import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import {
  IMatchedParticipationData,
  MATCHED_PARTICIPATION_DATA
} from '../../participation-happening/participation-happening/participation-happening.model';
import { takeUntil } from 'rxjs/operators';
import { MatchMemberService } from './match-member.service';

@Component({
  selector: 'lk-match-member-page',
  templateUrl: './match-member-page.component.html',
  styleUrls: ['./match-member-page.component.scss']
})

export class MatchMemberPageComponent implements OnInit, OnDestroy {

  public matchedParticipation: IMatchedParticipationData = MATCHED_PARTICIPATION_DATA;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private matchMemberService: MatchMemberService) {

  }

  ngOnInit() {
    this.matchMemberService.matchedParticipationSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((matchedParticipation) => this.matchedParticipation = matchedParticipation);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
