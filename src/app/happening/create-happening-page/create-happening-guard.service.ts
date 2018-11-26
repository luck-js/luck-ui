import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AppStateService } from '../../core/app-state.service';


@Injectable()
export class CreateHappeningServiceGuardService implements CanActivate {
  constructor(private router: Router,
              private appStateService: AppStateService
  ) {
  }

  private getParticipationHappeningData(id: string): Observable<boolean> {
    if (this.appStateService.isCreatingProcessFlag) {
      return of(true);
    }

    this.router.navigate([`/`]);
    return of(false);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getParticipationHappeningData(route.params['id']);
  }
}
