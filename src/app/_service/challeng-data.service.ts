import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Challenge } from '../_models/challenge';
import { Users } from '../_models/users';

@Injectable({
  providedIn: 'root'
})
export class ChallengDataService  {

  constructor(private http : HttpClient,
    private authService : AuthenticationService) { }
  @Output() onChallengesAdded = new EventEmitter<Challenge[]>();
  ChallengeData : Challenge[]=[
    {
      "challengeId":1,
      "challengeName" : "Ui Hackathon",
      "creationDate": "22 Aug 2018",
      "description": " Create a Ui grid with Api conected and design the sfvdfgbdgbnjfdvsfvsf",
      "tag":"UI",
      "voteCount":1
    }
  ];


  addChallenges(name,desc,tag,userId){
  // let userId = this.authService.CurrentUser.subscribe(users=>{
  //    console.log("userssss",users.userId)
  //  })
    // array in local storage for registered users
      let obj={
        challengeName : name,       
        description: desc , 
        tag : tag ,
        creationDate : new Date() , 
        challengeId : this.ChallengeData.length + 1, 
        voteCount : 0 ,
        userId : userId
      }
    this.ChallengeData.push(obj);
    localStorage.setItem('challenges', JSON.stringify(this.ChallengeData));
    this.onChallengesAdded.emit(this.ChallengeData.slice());
   
  }


}
