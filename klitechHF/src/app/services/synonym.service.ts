import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { SynonymData } from '../models/synonym.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SynonymService {

  constructor(private http: HttpClient) { }

  getSynonyms(inputWord: string): Observable<SynonymData> {
    return this.http.get<SynonymData>(environment.synonymAPIBaseURL + inputWord + '/synonyms', {
      headers: new HttpHeaders()
      .set(environment.XRapidAPIHostHeaderName, environment.XRapidAPIHostHeaderValue)
      .set(environment.XRapidAPIKeyHeaderName, environment.XRapidAPIKeyHeaderValue)
    });
  }
}
