import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CreatedHappening } from './happening.model';
import { AppStateService } from '../../core/app-state.service';

@Injectable()
export class HappeningService {
  public createdHappeningSubject: BehaviorSubject<CreatedHappening> = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient,
              private appStateService: AppStateService) {
  }

  public getCreatedHappening(id: string): Observable<CreatedHappening> {
    this.appStateService.setFlagIsCreatingProcessFlag(false);

    return this.httpClient
      .get<CreatedHappening>(`published-happening/${id}`)
      .pipe(
        tap((data) => this.createdHappeningSubject.next(data)),
        tap((data) => console.log('HappeningService.getCreatedHappening -> CreatedHappening: ', data)
        )
      );
  }
}
