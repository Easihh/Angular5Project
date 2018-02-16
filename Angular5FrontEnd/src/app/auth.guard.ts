import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataService } from "./data.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private dataService: DataService ,private router: Router){}
    
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot ): boolean {
            
        if(this.dataService.loggedIn()){
            return true;
        }
        console.log( "User is not logged in, rerouting to main page." );
        this.router.navigate(["/"]);
        return false;
    }
}
