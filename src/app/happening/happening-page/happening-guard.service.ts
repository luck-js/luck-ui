import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HappeningService } from '../happening-page/happening.service';


@Injectable()
export class HappeningServiceGuardService implements CanActivate {
  constructor(private router: Router,
              private happeningService: HappeningService) {
  }

  private getParticipationHappeningData(id: string): Observable<boolean> {

    return this.happeningService
      .getCreatedHappening(id).pipe(
        map(() => true),
        catchError((error) => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getParticipationHappeningData(route.params['id']);
  }
}
