import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUsers, Users } from './_models/users';
import {map} from 'rxjs/operators'
import { TotalCount } from './_models/individualChallenge';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() userObject = new EventEmitter();
 private currentUserSubject : BehaviorSubject <Users>;
 public CurrentUser : Observable <Users>;
 usersArray: RegisterUsers[]=[
   {userId : '1234',password :'1234',userEmail:'harsha@gmail.com'}
 ];
 totalCOuntArray : TotalCount[]=[];
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
    let stored = JSON.parse(localStorage.getItem("register users")) || [];
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
  userRegister(userId :string , email :string , password : string){
    let newUser = {
      userId : userId ,
      userEmail : email,
      password: password
    }
    const found = this.usersArray.some(el=>el.userId == newUser.userId);
    //check for duplicate users
    if(!found) {
      this.usersArray.push(newUser);
      localStorage.setItem("register users", JSON.stringify(this.usersArray));
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
