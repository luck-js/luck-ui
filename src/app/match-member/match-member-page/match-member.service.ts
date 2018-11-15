import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMatchedParticipationData } from '../../participation-happening/participation-happening/participation-happening.model';

@Injectable()
export class MatchMemberService {
  public matchedParticipationSubject: BehaviorSubject<IMatchedParticipationData> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  public getMatchedParticipation(id: string): Observable<IMatchedParticipationData> {

    return this.httpClient.get<IMatchedParticipationData>(`participation-happening/matched-member/${id}`).pipe(
      tap((data) => this.matchedParticipationSubject.next(data)),
      tap((data) => console.log('getMatchedParticipation: ', data)
      )
    );
  }
}
