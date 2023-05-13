import { Component } from '@angular/core';
import { SynonymData } from 'src/app/models/synonym.model';
import { Translation } from 'src/app/models/translation.model';
import { SynonymService } from 'src/app/services/synonym.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent {

  translationSource = '';
  translationResult?: Translation = {
    data: []
  };
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
