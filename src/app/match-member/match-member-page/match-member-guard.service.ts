import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MatchMemberService} from './match-member.service';


@Injectable()
export class MatchMemberGuardService implements CanActivate {
  constructor(private router: Router,
              private matchMemberService: MatchMemberService) {
  }

  private getMatchedMemberData(id: string): Observable<boolean> {
    return this.matchMemberService
      .getMatchedParticipation(id).pipe(
        map(() => true),
        catchError((error) => {
          this.router.navigate(['/']);
          return of(false);
        })
      );
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.getMatchedMemberData(route.params['id']);
  }
}
