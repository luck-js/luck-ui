import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewHappeningPageService } from './new-happening-page.service';


@Injectable()
export class NewHappeningPageGuardService implements CanActivate {
  constructor(private router: Router,
              private newHappeningPageService: NewHappeningPageService) {
  }

  private getParticipationHappeningData(): Observable<boolean> {
    return this.newHappeningPageService
      .createNewHappening().pipe(
        map(() => true),
        catchError((error) => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getParticipationHappeningData();
  }
}
