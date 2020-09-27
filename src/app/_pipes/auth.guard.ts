import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{
    constructor(
        private authService : AuthenticationService,
        private route : Router
    ){}
    canActivate(route : ActivatedRouteSnapshot , state : RouterStateSnapshot){
        const currentUser = this.authService.CurrentUserValue;
        if(currentUser){
           return true;
        }
        else{
            this.route.navigate(['/userLogin'] , {queryParams : {returnUrl : state.url}});
            return false;
        }
    }
}