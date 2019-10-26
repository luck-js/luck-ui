import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewHappeningPageService } from './new-happening-page.service';
import {AppStateService} from '../../core/app-state.service';


@Injectable()
export class NewHappeningPageGuardService implements CanActivate {
  constructor(private router: Router,
              private appStateService: AppStateService,
              private newHappeningPageService: NewHappeningPageService) {
  }

  private getParticipationHappeningData(): Observable<boolean> {
    const url = new URL(window.location.href);
    const name = url.searchParams.get('name');
    this.appStateService.setNameHappening(name);

    return this.newHappeningPageService
      .createNewHappening().pipe(
        map(() => true),
        catchError((error) => {
          window.location.href = 'https://luck.org.pl/';
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getParticipationHappeningData();
  }
}
