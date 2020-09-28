import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { Challenge } from '../_models/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengDataService  {
  private currentChallengeSubject : BehaviorSubject <Challenge>;
  public CurrentChallenge : Observable <Challenge>;
  constructor(private http : HttpClient,
    private authService : AuthenticationService) {
      this.currentChallengeSubject = new BehaviorSubject<Challenge>(JSON.parse(localStorage.getItem('challenges')));
      this.CurrentChallenge = this.currentChallengeSubject.asObservable();
      // localStorage.setItem('challenges', JSON.stringify( this.ChallengeData));
     }
  @Output() onChallengesAdded = new EventEmitter<Challenge[]>();
  ChallengeData : Challenge[]=[
    {
      "challengeName":'Ux /Ui Designing',
      "description":"Create Ui as per the given prototype and follow the instruction and use different themes and layout",
      "tag":"UI",
      "creationDate":"2020-09-27",
      "voteCount":4,
      "challengeId":1,
      "usersVoted":["harsha123"],
      "usersUpVoted":["harsha123"]
    },
    {
      "challengeName":'Ms /Backend Challenge',
      "description":"Create Ms as per the given prototype and follow the instruction and use different themes and layout",
      "tag":"Backend",
      "creationDate":"2020-09-24",
      "voteCount":2,
      "challengeId":2,
      "usersVoted":["harsha123","preeti"],
      "usersUpVoted":["harsha123"]
    }
   
  ];

  addChallenges(name,desc,tag,userId){
    // array in local storage for registered users
      let obj={
        challengeName : name,       
        description: desc , 
        tag : tag ,
        creationDate : new Date() , 
        challengeId : this.ChallengeData.length + 1, 
        voteCount : 0 ,
        userId : userId ,
        usersVoted :[],
        usersUpVoted :[]
      }
      this.ChallengeData.push(obj);
    localStorage.setItem('challenges', JSON.stringify( this.ChallengeData));

    //this.onChallengesAdded.emit(this.ChallengeData.slice());
  }
  public get CurrentRegistrationValue():Challenge{
    return this.currentChallengeSubject.value ;
  }
  
  


}
