import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  constructor(private http: HttpClient) { }
  options = {
  method: 'POST',
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': environment.TranslationKey,
    'X-RapidAPI-Host': environment.TranslationHost
  }),
  body: {
    from: 'auto',
    to: 'hu',
    e: '',
    q: 'car'
  }

  }
  translateText(text: string, targetLang: string){
    return this.http.post(environment.TranslationURL, this.options.body, { headers:this.options.headers });
  }
}
