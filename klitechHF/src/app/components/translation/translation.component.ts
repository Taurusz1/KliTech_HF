import { Component } from '@angular/core';
import { Translation } from 'src/app/models/translation.model';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {
  translationSource = '';
  translationResult?: Translation;
  langCodeFrom = '';
  langCodeTo = '';
  languages: Map<string, string> | null = null;
  languageOptions?: string[];

  constructor(
    private translationService: TranslationService
  ) { }
  ngOnInit(): void {
    this.readFileIntoSet();
  }
  onSubmitTran() {
    const sourceLang = this.languages?.get(this.langCodeFrom);
    const targetLang = this.languages?.get(this.langCodeTo);
    
    this.translationService
      .translateText(this.translationSource, sourceLang, targetLang)
      .subscribe({
        next: (response) => {
          this.translationResult! = response;
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
        map.set(value, key);
      }
    }
    this.languages = map;
    this.languageOptions = Array.from(map.keys());
  }
}
