import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../alert.service';
import { AuthenticationService } from '../authentication.service';
import { ChallengDataService } from '../_service/challeng-data.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
@Output() emitClick = new EventEmitter() ;
loading :boolean = false;
submitted = false ;
message:boolean;
returnUrl : string;
userForm : FormGroup ;
  constructor(
    private route : Router ,
    private fb : FormBuilder ,
    private activateRoute : ActivatedRoute ,
    private alertService : AlertService ,
    private authService :AuthenticationService,
    private challengeDataService : ChallengDataService
  ) {
    if(this.authService.CurrentUserValue){
      console.log("this.authService.getCurrentUserValue",this.authService.CurrentUserValue)
      this.route.navigate[('/')];
    }
   }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      userId : ['',Validators.required],
      userEmail : ['', Validators.required]
    });
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl'] || '/';
    this.authService.userObject.subscribe(value=>{
      if(value == false){
        this.message =true ;
      }
      else{
        this.message =false ;
       
      }
    })
  }

  get f(){
    return this.userForm.controls ;
  }

  

  onSubmit(){
    this.submitted = true; 
    if (this.userForm.invalid) {
      return;
  }

  this.loading = true ;
   this.authService.userLogin(this.f.userId.value , this.f.userEmail.value);
   this.route.navigate([this.returnUrl]);


}
}
