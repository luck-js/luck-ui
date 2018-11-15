import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HappeningService } from './happening.service';
import { NewHappeningPageService } from '../new-happening-page/new-happening-page.service';


@Injectable()
export class HappeningServiceGuardService implements CanActivate {
  constructor(private router: Router,
              private happeningService: HappeningService,
              private newHappeningPageService: NewHappeningPageService,
              ) {
  }

  private getParticipationHappeningData(id: string): Observable<boolean> {
    if (this.newHappeningPageService.isCreatingProcessFlag) {
      return of(true);
    }

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
