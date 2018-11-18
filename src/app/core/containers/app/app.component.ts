import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lk-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('style.height')
  public styleHeight: any;

  private oryginalHeight: number;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
       (<any>window).ga('set', 'page', event.urlAfterRedirects);
       (<any>window).ga('send', 'pageview');
     }
   });
 }

  ngOnInit() {
    this.oryginalHeight = this.getHeightNativeElement();
    console.log('this.oryginalHeight: ', this.oryginalHeight);
    fromEvent(window, 'resize').pipe(
      takeUntil(this.ngUnsubscribe),
      debounceTime(250)
    )
      .subscribe((event) => this.windowResizeSubscriber());

    // fromEvent(window, 'orientationchange').pipe(
    //   takeUntil(this.ngUnsubscribe)
    // )
    //   .subscribe((event) => this.windowOrientationChangeSubscriber());

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();


  }

  private windowResizeSubscriber() {
    this.recalculateSizeForAllComponents();
  }

  private windowOrientationChangeSubscriber() {
    this.recalculateSizeForAllComponents();
  }

  private recalculateSizeForAllComponents() {
    const currentHeight = this.getHeightNativeElement();
    const newHeight = getPercent(this.oryginalHeight, currentHeight);
    this.setStyleHeight(newHeight);
    console.log('currentHeight: ', currentHeight);
    console.log('this.oryginalHeight : ', this.oryginalHeight);
    console.log('newHeight: ', newHeight);
  }

  private getHeightNativeElement(): number {
    return Number(window.innerHeight);
  }

  private setStyleHeight(height: number) {
    this.styleHeight = `${height}%`;
  }


}

export function getPercent(a: number, b: number): number {
  return (b !== 0) ? mathRound(a * 100 / b, 2) : 0;
}

function mathRound(number, decimalPlaces): number {
  return Number(Math.round(number * 100).toFixed(decimalPlaces)) / 100;
}
