import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

declare const ga: any;

@Component({
  selector: 'lk-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('style.height')
  public styleHeight: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private router: Router) {
    if (ga) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
      });
    }
  }

  ngOnInit() {
    this.styleHeight = this.getStaticHeightForAppContainer();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private getStaticHeightForAppContainer(): string {
    return returnStyleHeight(this.getHeightNativeElement());
  }

  private getHeightNativeElement(): number {
    return Number(window.innerHeight);
  }
}

function returnStyleHeight(height: number): string {
  return `${height}px`;
}
