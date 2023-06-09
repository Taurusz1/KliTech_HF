import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { SynonymData } from '../models/synonym.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

//Implements Service for getting synonyms of words
export class SynonymService {
  constructor(private http: HttpClient) {}

  //Calls synonyms endpoint with get request, returns Observalbe SynonymData
  getSynonyms(inputWord: string): Observable<SynonymData> {
    return this.http.get<SynonymData>(
      environment.WordsAPIURL + inputWord + '/synonyms',
      {
        headers: new HttpHeaders()
          .set(environment.XRapidAPIHostHeaderName, environment.WordsAPIHost)
          .set(environment.XRapidAPIKeyHeaderName, environment.WordsAPIKey),
      }
    );
  }
}
