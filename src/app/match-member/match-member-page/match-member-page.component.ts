import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IMemberView } from '../../participation-happening/participation-happening/participation-happening.model';
import { takeUntil } from 'rxjs/operators';
import { MatchMemberService } from './match-member.service';

@Component({
  selector: 'lk-match-member-page',
  templateUrl: './match-member-page.component.html',
  styleUrls: ['./match-member-page.component.scss']
})

export class MatchMemberPageComponent implements OnInit, OnDestroy {

  public memberView: IMemberView;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private matchMemberService: MatchMemberService) {

  }

  ngOnInit() {
    this.matchMemberService.memberViewSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((memberView) => this.memberView = memberView);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
