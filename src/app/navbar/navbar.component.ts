import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authservice : AuthenticationService,
    private route : Router 
  ) { }

  ngOnInit(): void {
  }
  logout(){
    this.authservice.logout();
    this.route.navigate(['/userLogin']);
  }
}
