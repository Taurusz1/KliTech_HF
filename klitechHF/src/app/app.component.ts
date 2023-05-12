import { Component, OnInit } from '@angular/core';
import { SynonymService } from './services/synonym.service';
import { SynonymData } from './models/synonym.model';
import { Translation } from './models/translation.model';
import { TranslationService } from './services/translation.service';
import { Languanges } from './models/languages.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  synonymSearch = '';
  synonymData?: SynonymData;
  translationSource = '';
  translationResult?: Translation = {
    data: []
  };
  langCode = 'hu';
  private langs: Map<string, string> | null = null;

  constructor(
    private synonymService: SynonymService,
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.readFileIntoSet();
  }
  onSubmitSyn() {
    this.synonymService.getSynonyms(this.synonymSearch).subscribe({
      next: (response) => {
        console.log(response);
        this.synonymData = response;
      },
    });
  }
  onSubmitTran() {
    this.translationService
      .translateText(this.translationSource, this.langCode)
      .subscribe({
        next: (response) => {
          this.translationResult!.data = response;
          console.log(this.translationResult!.data[0][0]);
        },
      });
  }
  async readFileIntoSet(): Promise<void> {
    const map = new Map<string, string>();
    const filePath = 'assets/languages.txt';
    const response = await fetch(filePath);
    const fileContent = await response.text();
    const lines = fileContent.split('\n');
  
    for (const line of lines) {
      const [key, value] = line.split(': ');
  
      if (key && value) {
        map.set(key, value);
      }
    }
    this.langs = map;
  }
}
