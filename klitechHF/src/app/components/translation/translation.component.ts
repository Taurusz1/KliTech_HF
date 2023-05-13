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
  langCode = 'hu';
  private langs: Map<string, string> | null = null;

  constructor(
    private translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.readFileIntoSet();
  }
  onSubmitTran() {
    this.translationService
      .translateText(this.translationSource, this.langCode)
      .subscribe({
        next: (response) => {
          this.translationResult! = response;
          console.log(this.translationResult![0][0]);
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
