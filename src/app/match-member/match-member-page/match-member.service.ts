import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IMemberView } from '../../participation-happening/participation-happening/participation-happening.model';

@Injectable()
export class MatchMemberService {
  public memberViewSubject: BehaviorSubject<IMemberView> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  public getMatchedMember(id: string): Observable<IMemberView> {

    return this.httpClient.get<IMemberView>(`participation-happening/matched-member/${id}`).pipe(
      tap((data) => this.memberViewSubject.next(data)),
      tap((data) => console.log('getMatchedMember: ', data)
      )
    );
  }
}
