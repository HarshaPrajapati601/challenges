import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterUsers, Users } from './_models/users';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  @Output() userObject = new EventEmitter();
 private currentUserSubject : BehaviorSubject <Users>;
 public CurrentUser : Observable <Users>;
 usersArray: RegisterUsers[]=[
   {userId : '1234', userName :'harsha' ,passWord :'1234',userEmail:'harsha@gmail.com'}
 ];
  constructor(
    private route : Router,
    private _http : HttpClient
  ) { 
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('current User')));
    this.CurrentUser = this.currentUserSubject.asObservable();
  }

  public get CurrentUserValue():Users{
    console.log("this.currentUserSubject.value ",this.currentUserSubject.value )
    return this.currentUserSubject.value ;
  }
 
  userLogin( userId :string , email :string){
    let userObj = {
      userId : userId ,
      userEmail : email
    }
    //validate if user is already
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

  userRegister(userId :string ,userName:string, email :string , password : string){
    let newUser = {
      userId : userId ,
      userName : userName,
      userEmail : email,
      passWord: password
    }
      this.usersArray.push(newUser);
        localStorage.setItem("register users", JSON.stringify(this.usersArray));
    // this.usersArray.forEach(curr=>{
    //   if(curr.userId == newUser.userId){
    //     this.userObject.emit(false);
    //     return;
    //   }
    //   else{
    //     this.usersArray.push(newUser);
    //     localStorage.setItem("register users", JSON.stringify(this.usersArray));
    //   }
    //})


  
  }

  logout(){
      // remove user from local storage to log user out
      localStorage.removeItem('current User');
      this.currentUserSubject.next(null);
  }
}
