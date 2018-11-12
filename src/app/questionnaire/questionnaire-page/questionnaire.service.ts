import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QuestionnaireData } from './questionnaire.model';

interface Option {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
}

@Injectable()
export class QuestionnaireService {
  private option: Option;
  private url = 'https://docs.google.com/forms/d/e/1FAIpQLSdINZGLJmJkWkC6GW9RdZYDyCEBHRrphISbsp8yW6LyZ_Px_A/formResponse';

  constructor(private httpClient: HttpClient) {
    this.option = {
      headers:  new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8"')
        .set('Access-Control-Allow-Origin', 'true')
    }
  }

  public send(questionnaireData: any): Observable<any> {
    var str = [];
    for (var p in questionnaireData)
      str.push('entry.' + encodeURIComponent(p) + "=" + encodeURIComponent(questionnaireData[p]));
    const entry = str.join("&");

    console.log('entry: ', entry)

    return this.httpClient
      .post<any>(`${this.url}`, { data: entry },  this.option)
      .pipe(
        tap((data) => console.log('HappeningService.generateDetailedParticipantListInformation -> ParticipantUniqueLinkData[]: ', data)
        )
      );
  }
}
