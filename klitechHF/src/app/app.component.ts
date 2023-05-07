import { Component, OnInit } from '@angular/core';
import { SynonymService } from './services/synonym.service';
import { SynonymData } from './models/synonym.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  synonymData?: SynonymData;

  constructor(private synonymService: SynonymService){}

  ngOnInit(): void {
    this.synonymService.getSynonyms('car').subscribe({
      next: (response) => {
        console.log(response);
        this.synonymData = response;
      }
    });
  }
  
}
