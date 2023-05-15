import { Component } from '@angular/core';
import { Translation } from 'src/app/models/translation.model';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})

/*Implements onSubmitTran function uses TranslationService and other variables and calls the translateText function
 *of the TranslationService that returns a Translation object, which stores the translated text.
 */
export class TranslationComponent {
  translationSource = '';
  translationResult?: Translation;
  langFrom = '';
  langTo = '';
  //Maps the language names, to the Language code
  languages: Map<string, string> | null = null;
  //List of Language names
  languageOptions?: string[];

  //Recieves a TranslationService parameter to be used with the onSubmit function
  constructor(
    private translationService: TranslationService
  ) { }

  //Since there is no /languages endpoint on the API, the program loads them from a static textfile
  ngOnInit(): void {
    this.readFileIntoSet();
  }
  /*Sends the http request through the service, and in the next() saves the data to the model object
  *Retrieves the sourcelangC and targetlang code variables from the Map using the language names
  */
  onSubmitTran() {
    const sourceLang = this.languages?.get(this.langFrom) ?? 'auto';
    const targetLang = this.languages?.get(this.langTo) ?? 'hu';
    this.translationService
      .translateText(this.translationSource, sourceLang, targetLang)
      .subscribe({
        next: (response) => {
          this.translationResult! = response;
        },
      });
  }
  
  //Loads the Language Map and Langauge options with the content of the languages.txt
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
