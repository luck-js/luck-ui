import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IParticipationHappening } from './participation-happening.model';

@Injectable()
export class ParticipationHappeningService {
  public participationHappeningSubject: BehaviorSubject<IParticipationHappening> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  public getData(id: string): Observable<IParticipationHappening> {

    return this.httpClient.get<IParticipationHappening>(`participation-happening/${id}`).pipe(
      tap((data) => this.participationHappeningSubject.next(data)),
      tap((data) => console.log('ParticipationHappeningService.getData -> IParticipationHappening: ', data)
      )
    );
  }
}
