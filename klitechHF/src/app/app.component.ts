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
  synonymSearch = '';
  constructor(private synonymService: SynonymService){}

  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.synonymService.getSynonyms(this.synonymSearch).subscribe({
      next: (response) => {
        console.log(response);
        this.synonymData = response;
      }
    });
  }
}
