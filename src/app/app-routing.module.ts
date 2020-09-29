import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChallengesComponent } from './challenges/challenges.component';
import { HomeComponent } from './home/home.component';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AuthGuard } from './_pipes/auth.guard';

const routes: Routes = [
  {path:'' , component:HomeComponent , canActivate :[AuthGuard]},
  {path:'userLogin' , component:UserLoginComponent },
  {path:'register' , component: NewRegistrationComponent },
  {path:'challenge' , component:ChallengesComponent},
  {path:'**' , component:UserLoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
