import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NewHappeningPageService } from './new-happening-page.service';

@Component({
  selector: 'lk-new-happening-page',
  templateUrl: './new-happening-page.component.html',
  styleUrls: ['./new-happening-page.component.scss']
})

export class NewHappeningPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router,
              private newHappeningPageService: NewHappeningPageService) {
  }

  ngOnInit() {
    this.newHappeningPageService.happeningIdSubject.pipe(
      takeUntil(this.ngUnsubscribe),
      tap((happeningId) => this.router.navigate(['/happening', happeningId]))
    )
      .subscribe((_) => {
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
