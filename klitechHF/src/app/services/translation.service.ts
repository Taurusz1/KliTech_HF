import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { Translation } from '../models/translation.model';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private http: HttpClient) {}
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
  translateText(text: string, targetLang: string): Observable<string[]> {
    this.options.body = {
      from: 'auto',
      to: 'hu',
      e: '',
      q: text,
    };
    return this.http.post<string[]>(
      environment.TranslationURL,
      this.options.body,
      {
        headers: this.options.headers,
      }
    );
  }
}
