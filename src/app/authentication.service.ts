import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUsers, Users } from './_models/users';
import { db } from './_service/firebase.js';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() userObject = new EventEmitter();
 private currentUserSubject : BehaviorSubject <Users>;
 public CurrentUser : Observable <Users>;
 usersArray: RegisterUsers[]=[
 ];
  constructor(
    private route : Router,
    private _http : HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('current User')));
    this.CurrentUser = this.currentUserSubject.asObservable();
  }

  public get CurrentUserValue():Users{
    return this.currentUserSubject.value ;
  }
 
  //Login for user
  userLogin( userId :string , email :string){
    let userObj = {
      userId : userId ,
      userEmail : email
    }
    //validate if user is already there in registered users array
    let stored = JSON.parse(localStorage.getItem("users")) || [];
    stored.find(cur=>{
      if( cur.userId != userObj.userId || cur.userEmail != userObj.userEmail ){
        return this.userObject.emit(false);
      }
      else{
      if(userObj){
          localStorage.setItem('current User', JSON.stringify(userObj))
        }
      this.currentUserSubject.next(userObj);
      return this.userObject.emit(true);
      }
    })
  }

  //new user creation
  userRegister(userId :string , email :string){
    let newUser = {
      userId : userId ,
      userEmail : email
    }
    const found = this.usersArray.some(el=>el.userId == newUser.userId);
    this.usersArray = JSON.parse(localStorage.getItem("users")) || [];
    this.usersArray.push(newUser);
    localStorage.setItem("users", JSON.stringify(this.usersArray));
    //check for duplicate users
    if(!found) {
      db.collection("users").doc(newUser.userId).set(newUser)
      .then(function(docRef) {
        console.log("Document written with ID: ", docRef);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });

      this.userObject.emit(true);
      return this.usersArray;
    }else{
      this.userObject.emit(false);
    }

  }

  logout(){
      // remove user from local storage to log user out
      localStorage.removeItem('current User');
      this.currentUserSubject.next(null);
  }
}
