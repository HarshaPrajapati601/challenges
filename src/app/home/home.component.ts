import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Challenge } from '../_models/challenge';
import { ChallengDataService } from '../_service/challeng-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource : Challenge[] ;
  direction:string="asc";
  column:string="challengeName";
  type:Date ;
  constructor(
    private _challengeServicev : ChallengDataService,
    private route : Router,
     private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
  this.dataSource =JSON.parse(localStorage.getItem("challenges"));
  this.activatedRoute.params
  .subscribe((params : Params)=>{
    console.log("para",params)
  })
  }

  setSortParams(param){
  this.direction=param.dir;
  this.column=param.col;
  this.type=param.typ;
  }

}
