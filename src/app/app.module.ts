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
// import { SharedMaterialModule } from 'shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChallengesComponent,
    UserLoginComponent,
    NavbarComponent,
    AlertComponent,
    SortPipe,
    SortParamsDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
