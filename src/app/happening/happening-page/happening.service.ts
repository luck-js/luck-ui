import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreatedHappening, Happening } from './happening.model';

@Injectable()
export class HappeningService {
  public createdHappeningSubject: BehaviorSubject<CreatedHappening> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient) {
  }

  public generateDetailedParticipantListInformation(id: string, happening: Happening): Observable<CreatedHappening> {
    return this.httpClient
      .post<CreatedHappening>(`happening/generate-detailed-participant-list-information/${id}`, {happening})
      .pipe(
        tap((data) => this.createdHappeningSubject.next(data)),
        tap((data) => console.log('HappeningService.generateDetailedParticipantListInformation -> CreatedHappening: ', data)
        )
      );
  }

  public getCreatedHappening(id: string): Observable<CreatedHappening> {
    return this.httpClient
      .get<CreatedHappening>(`happening/generate-detailed-participant-list-information/${id}`)
      .pipe(
        tap((data) => this.createdHappeningSubject.next(data)),
        tap((data) => console.log('HappeningService.getCreatedHappening -> CreatedHappening: ', data)
        )
      );
  }
}
