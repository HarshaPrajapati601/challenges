import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.css']
})
export class NewRegistrationComponent implements OnInit {
  newUserForm: FormGroup;
  loading = false;
  submitted = false;
  message :boolean;
  constructor(
    private fb : FormBuilder,
    private route : Router,
    private authservice : AuthenticationService
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      userId : ['',Validators.required],
      email: ['', Validators.required]
    })
    this.authservice.userObject.subscribe(value=>{
      if(value == false){
        this.message =true ;
      }
      else{
        this.message =false ;
        this.route.navigate(['/userLogin']);
      }
    })
  
  }
  get f(){
    return this.newUserForm.controls;
  }
   onSubmit(){
     this.submitted = true;
     if (this.newUserForm.invalid) {
      return;
  }
  this.loading = true ;
  this.authservice.userRegister(this.f.userId.value, this.f.email.value);
}
}
