import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatedHappening, Happening } from '../happening-page/happening.model';

@Injectable()
export class CreateHappeningService {

  constructor(private httpClient: HttpClient) {
  }

  public publishHappening(id: string, happening: Happening): Observable<CreatedHappening> {
    return this.httpClient
      .post<CreatedHappening>(`published-happening/${id}`, {happening})
  }
}
