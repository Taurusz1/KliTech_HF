import { Component } from '@angular/core';
import { SynonymData } from 'src/app/models/synonym.model';
import { SynonymService } from 'src/app/services/synonym.service';

@Component({
  selector: 'app-synonym',
  templateUrl: './synonym.component.html',
  styleUrls: ['./synonym.component.css']
})

/*Implements onSubmitSyn function uses the synonymSearch variable and calls the getSynonyms function of the Service
 *that returns a SynonymData object, which stores the searched term, and all of it's synoyms
 */
export class SynonymComponent {
  synonymSearch = '';
  synonymData?: SynonymData;

  //Recieves a SynonymService parameter to be used with the onSubmit function
  constructor(
    private synonymService: SynonymService
  ) { }

  ngOnInit(): void {}
  
  //Sends the http request through the service, and in the next() saves the data to the model object
  onSubmitSyn() {
    this.synonymService.getSynonyms(this.synonymSearch).subscribe({
      next: (response) => {
        this.synonymData = response;
      },
    });
  }
}
