import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { db } from './firebase.js';
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

     }
  @Output() onChallengesAdded = new EventEmitter<Challenge[]>();
 ChallengeData :Challenge[]= [];

  addChallenges(name,desc,tag,userId){
    // array in local storage for registered users
    this.ChallengeData = JSON.parse(localStorage.getItem('challenges')) || [];
      let obj={
        challengeName : name,       
        description: desc , 
        tag : tag ,
        creationDate : new Date(), 
        challengeId : this.ChallengeData.length + 1, 
        voteCount : 0 ,
        userId : userId ,
        usersVoted :[],
        usersUpVoted :[]
      }

  
      db.collection("challenges").doc(`${obj.challengeId}`).set(obj)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
      this.ChallengeData.push(obj);
      localStorage.setItem('challenges', JSON.stringify(this.ChallengeData));
      
      return this.ChallengeData;
    //this.onChallengesAdded.emit(this.ChallengeData.slice());
  }

  
  public get CurrentRegistrationValue():Challenge{
    return this.currentChallengeSubject.value ;
  }
  
  


}
