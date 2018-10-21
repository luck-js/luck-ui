import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ParticipationHappeningService } from './participation-happening.service';


@Injectable()
export class ParticipationHappeningGuardService implements CanActivate {
  constructor(private router: Router,
              private participationHappeningService: ParticipationHappeningService) {
  }

  private getParticipationHappeningData(id: string): Observable<boolean> {
    return this.participationHappeningService
      .getData(id).pipe(
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
