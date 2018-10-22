import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Happening } from './happening.model';
import { ParticipantUniqueLinkData } from '../../participation-happening/participation-happening/participation-happening.model';

@Injectable()
export class HappeningService {

  constructor(private httpClient: HttpClient) {
  }

  public generateDetailedParticipantListInformation(id: string, happening: Happening): Observable<ParticipantUniqueLinkData[]> {
    return this.httpClient
      .post<ParticipantUniqueLinkData[]>(`happening/generate-detailed-participant-list-information/${id}`, {happening})
      .pipe(
        tap((data) => console.log('HappeningService.generateDetailedParticipantListInformation -> ParticipantUniqueLinkData[]: ', data)
        )
      );
  }
}
