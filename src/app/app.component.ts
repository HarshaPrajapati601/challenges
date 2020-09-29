import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Users } from './_models/users';
import { db } from './_service/firebase.js';

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
    db.collection("users").get().then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());
      localStorage.setItem('users', JSON.stringify(data));
    });
    db.collection("challenges").get().then((querySnapshot) => {
      const data = querySnapshot.docs.map(doc => doc.data());
      localStorage.setItem('challenges', JSON.stringify(data));
    });
    this.authservice.CurrentUser
    .subscribe(x_user=>{
      this.currentUser = x_user;
    })
  }
  ngOnInit(){
  }
  logout(){
    this.authservice.logout();
    this.route.navigate(['/userLogin']);
  }
  ToggleNavBar() {
    let element: HTMLElement = document.getElementsByClassName( 'navbar-toggler' )[ 0 ] as HTMLElement;
    if ( element.getAttribute( 'aria-expanded' ) == 'true' ) {
        element.click();
    }
  }
   
}
