import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { element } from 'protractor';
import { AuthenticationService } from '../authentication.service';
import { Challenge } from '../_models/challenge';
import { ChallengDataService } from '../_service/challeng-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource :any;
  direction:string="asc";
  column:string="challengeName";
  type:Date ;
  likes:boolean = true;
  currentUserDetails ;
  @Output() emitCount = new EventEmitter();
  constructor(
    private _challengeServicev : ChallengDataService,
    private route : Router,
     private activatedRoute : ActivatedRoute,
     private authservice : AuthenticationService
  ) { 
  
  }

  ngOnInit() {
    this.dataSource =JSON.parse(localStorage.getItem("challenges"));
    this.activatedRoute.params
    .subscribe((params : Params)=>{
      console.log("para",params)
    });
    this.currentUserDetails = this.authservice.CurrentUserValue.userId ;
  }

  setSortParams(param){
  this.direction=param.dir;
  this.column=param.col;
  this.type=param.typ;
  }
//Users who upvote for a challenge
  upVoteChallenge(userRegister){
    let challengesObj = JSON.parse(localStorage.getItem("challenges")) || {};
    for (var i = 0; i < challengesObj.length; i++) {
      if(challengesObj[i].usersUpVoted.length == 0  && challengesObj[i].challengeId == userRegister.challengeId){  
        challengesObj[i].usersUpVoted.push(this.currentUserDetails);
        userRegister.usersUpVoted = challengesObj[i].usersUpVoted;
        localStorage.setItem("challenges", JSON.stringify(challengesObj));
      }
      else if(challengesObj[i].usersUpVoted.length > 0 && challengesObj[i].challengeId == userRegister.challengeId){
        if((challengesObj[i].usersUpVoted).includes(this.currentUserDetails) == false){
          userRegister.usersUpVoted = challengesObj[i].usersUpVoted;
            challengesObj[i].usersUpVoted.push(this.currentUserDetails);
            localStorage.setItem("challenges", JSON.stringify(challengesObj));
        }
      }
    }
    localStorage.getItem("challenges");
  }
  
   addDataToChallengesArray(ele , direction : boolean) {
    let challengesObj = JSON.parse(localStorage.getItem("challenges")) || {};
            // get the current challengesObj, or an empty object if null  
      if(direction == false){
        for (var i = 0; i < challengesObj.length; i++) {
          if(challengesObj[i].usersVoted.length == 0  && challengesObj[i].challengeId == ele.challengeId){
            challengesObj[i].voteCount++ ;
            ele.voteCount = challengesObj[i].voteCount;   
            challengesObj[i].usersVoted.push(this.currentUserDetails);
            localStorage.setItem("challenges", JSON.stringify(challengesObj));
          }
          else if(challengesObj[i].usersVoted.length > 0 && challengesObj[i].challengeId == ele.challengeId){
                if((challengesObj[i].usersVoted).includes(this.currentUserDetails) == false){
                  challengesObj[i].voteCount++ ;
                  ele.voteCount = challengesObj[i].voteCount ;  
                    challengesObj[i].usersVoted.push(this.currentUserDetails);
                    localStorage.setItem("challenges", JSON.stringify(challengesObj));
                }
          }
        }  // put the result back in localStorage and update datasource
    }
    else{
        for (var i = 0; i < challengesObj.length; i++) {
          if(challengesObj[i].usersVoted.length > 0 && challengesObj[i].challengeId == ele.challengeId){
                if((challengesObj[i].usersVoted).includes(this.currentUserDetails)){
                 let index = challengesObj[i].usersVoted.findIndex(obj=> obj ==this.currentUserDetails);
                  challengesObj[i].voteCount-- ;
                   ele.voteCount =  challengesObj[i].voteCount;  
                    challengesObj[i].usersVoted.splice(index ,1);
                    localStorage.setItem("challenges", JSON.stringify(challengesObj));
                }
          }
        }
    }
}

  onLikeToggle(ele){
    //button changes to liked
      //count gets incremented in challenges array
     this.addDataToChallengesArray(ele ,false ) ;
     this.likes =false;  
     this.dataSource =JSON.parse(localStorage.getItem("challenges"));
     //the userId gets added in challenges array
  
  }

  onDisLikeToggle(ele){
      this.addDataToChallengesArray(ele ,true ) ;
      this.likes =true; 
      this.dataSource =JSON.parse(localStorage.getItem("challenges"));
  }

}
