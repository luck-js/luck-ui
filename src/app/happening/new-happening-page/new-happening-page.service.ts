import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class NewHappeningPageService {
  public happeningIdSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }

  public createNewHappening(): Observable<string> {
    return this.httpClient.post<string>(`happening/create`, null).pipe(
      tap((data) => this.happeningIdSubject.next(data)),
      tap((data) => console.log('createNewHappening: ', data)
      )
    );
  }
}
