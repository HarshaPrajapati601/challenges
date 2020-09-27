import { Component, OnInit } from '@angular/core';
import { Challenge } from '../_models/challenge';
import { ChallengDataService } from '../_service/challeng-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource : Challenge[] ;
  searchTerm:string="";
  // direction:string="asc";
  direction : boolean;
  column:string="challengeName";
  type:Date ;
  constructor(
    private _challengeServicev : ChallengDataService
  ) { }

  ngOnInit() {
  this.dataSource = this._challengeServicev.ChallengeData;
  }

  setSortParams(param){
  this.direction=param.dir;
  this.column=param.col;
  this.type=param.typ;
  }

}
