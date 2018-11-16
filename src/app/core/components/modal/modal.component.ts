import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStateService } from '../../app-state.service';
import { Subject } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'lk-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  show = false;

  constructor(private appStateService: AppStateService) {
  }

  ngOnInit() {
    this.appStateService.showModal.pipe(
      delay(10),
      tap(flag => this.show = flag),
      delay(500)
    )
      .subscribe(flag => this.show = false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
