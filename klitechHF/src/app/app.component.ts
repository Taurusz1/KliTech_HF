import { Component, OnInit } from '@angular/core';
import { SynonymService } from './services/synonym.service';
import { SynonymData } from './models/synonym.model';
import { Translation } from './models/translation.model';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  synonymSearch = '';
  synonymData?: SynonymData;
  translationSource = '';
  translationResult?: Translation;
  langCode = 'hu';
  constructor(
    private synonymService: SynonymService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {}

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
          console.log(response);
          this.translationResult = response;
          this.translationResult.data.pop();
        },
      });
  }
}
