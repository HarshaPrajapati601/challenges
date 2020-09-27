import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Users } from './_models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hacker-news';
  loggedIn :boolean = false;
  currentUser : Users;
  message:boolean =true;
  constructor(
    private authservice : AuthenticationService,
    private route : Router
  ){
    this.authservice.CurrentUser
    .subscribe(x_user=>{
      console.log("usr",x_user)
      this.currentUser = x_user;
    })
  }
  ngOnInit(){
  }
  logout(){
    this.authservice.logout();
    this.route.navigate(['/userLogin']);
  }

   
}
