import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NewHappeningPageService } from '../new-happening-page/new-happening-page.service';


@Injectable()
export class CreateHappeningServiceGuardService implements CanActivate {
  constructor(private router: Router,
              private newHappeningPageService: NewHappeningPageService,
              ) {
  }

  private getParticipationHappeningData(id: string): Observable<boolean> {
    if (this.newHappeningPageService.isCreatingProcessFlag) {
      return of(true);
    }

    this.router.navigate([`/happening/view/${id}`]);
    return of(false);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getParticipationHappeningData(route.params['id']);
  }
}
