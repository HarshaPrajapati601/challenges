import { EventEmitter, Injectable, Output } from '@angular/core';
import { Challenge } from '../_models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengDataService {

  constructor() { }
  @Output() onChallengesAdded = new EventEmitter<Challenge[]>();
  ChallengeData : Challenge[]=[
    {
      "challengeId":1,
      "challengeName" : "Ui Hackathon",
      "creationDate": "22 Aug 2018",
      "description": " Create a Ui grid with Api conected and design the sfvdfgbdgbnjfdvsfvsf",
      "tag":"UI",
      "voteCount":1,
    }
  ]

  addChallenges(name,desc,tag){
    // array in local storage for registered users
      let obj={
        challengeName : name,       
        description: desc , 
        tag : tag ,
        creationDate : new Date() , 
        challengeId : this.ChallengeData.length + 1, 
        voteCount : 0 
      }
    localStorage.setItem('challenges', JSON.stringify(obj));
    this.ChallengeData.push(obj);
    this.onChallengesAdded.emit(this.ChallengeData.slice());
   
  }

  getChallengesdata(){
   // this.ChallengeData.
  }

}
