import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root',
})
//Implements Service for translation of text
export class TranslationService {
  constructor(private http: HttpClient) {}

  //Template for http body
  options = {
    method: 'POST',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': environment.TranslationKey,
      'X-RapidAPI-Host': environment.TranslationHost,
    }),
    body: {
      from: 'auto',
      to: 'hu',
      e: '',
      q: 'Error',
    },
  };

  //Calls translation endpoint with post request, returns Observalbe string array
  translateText(text: string, sourceLang?: string, targetLang?: string): Observable<string[]> {
    this.options.body = {
      from: sourceLang!,
      to: targetLang!,
      e: '',
      q: text,
    };
    return this.http.post<string[]>(
      environment.TranslationURL +'/t',
      this.options.body,
      {
        headers: this.options.headers,
      }
    );
  }
}
