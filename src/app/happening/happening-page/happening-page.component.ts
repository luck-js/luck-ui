import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { WINDOW } from '../../app.module';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ParticipantUniqueLinkData } from './happening.model';
import { HappeningService } from './happening.service';

@Component({
  selector: 'lk-happening-page',
  templateUrl: './happening-page.component.html',
  styleUrls: ['./happening-page.component.scss']
})

export class HappeningPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  public name = '';
  public description = '';
  public participantUniqueLinkData: ParticipantUniqueLinkData[] = [];

  constructor(
    @Inject(WINDOW) private window: Window,
    private happeningService: HappeningService) {
  }

  ngOnInit() {
    this.happeningService.createdHappeningSubject.pipe(
      takeUntil(this.ngUnsubscribe)
    )
      .subscribe((created) => {
        this.participantUniqueLinkData = created ? created.participantList : [];
        this.name = created ? created.name : '';
        this.description = created ? created.description : '';
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getHost(): string {
    return this.window.location.host;
  }

  public getValue(id: string) : string {
    return `http://www.${this.getHost()}/#/participation/${id}`
  }

  public copyValue(target: HTMLInputElement){
    target.select();
    document.execCommand('copy');
  }

  public provoked(event: Event) {
    event.preventDefault()
  }

  public returnValue(target: HTMLInputElement, id: string){
    const originValue = this.getValue(id);
    target.value = target.value !== originValue ? originValue : target.value;
  }
}
