import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ChallengesComponent } from './challenges/challenges.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { SortPipe } from './_pipes/sort-pipe';
import { SortParamsDirective } from './_pipes/sortParams-directive';
import{ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { datePipeDirective } from './_pipes/date-pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChallengesComponent,
    UserLoginComponent,
    NavbarComponent,
    AlertComponent,
    SortPipe,
    datePipeDirective,
    SortParamsDirective,
    
    NewRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
