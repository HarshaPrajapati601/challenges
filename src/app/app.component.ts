import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hacker-news';
  loggedIn :boolean = false;

  ngOnInit(){
    console.log("loggedIn",this.loggedIn)
  }
   
}
