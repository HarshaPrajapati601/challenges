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
      firstName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.authservice.userObject.subscribe(val=>{
      if(val){
        this.message = true;
      }else{
        this.message = true;
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
  this.authservice.userRegister(this.f.userId.value , this.f.firstName.value, this.f.email.value , this.f.password.value);
  this.route.navigate(['/userLogin']);
}
}
