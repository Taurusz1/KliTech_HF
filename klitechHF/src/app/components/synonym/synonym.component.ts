import { Component } from '@angular/core';
import { SynonymData } from 'src/app/models/synonym.model';
import { SynonymService } from 'src/app/services/synonym.service';

@Component({
  selector: 'app-synonym',
  templateUrl: './synonym.component.html',
  styleUrls: ['./synonym.component.css']
})
export class SynonymComponent {
  synonymSearch = '';
  synonymData?: SynonymData;

  constructor(
    private synonymService: SynonymService
  ) { }
  ngOnInit(): void {}
  onSubmitSyn() {
    this.synonymService.getSynonyms(this.synonymSearch).subscribe({
      next: (response) => {
        this.synonymData = response;
      },
    });
  }
}
