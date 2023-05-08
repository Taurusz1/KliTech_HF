import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) { }

  translateText(text: string, targetLang: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `key=${environment.YandexAPIKey}&text=${encodeURIComponent(text)}&lang=${targetLang}`;

    return this.http.post(environment.YandexTranslateAPIURL, body, { headers });
  }
}
