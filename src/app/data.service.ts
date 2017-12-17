import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICountry } from './icountry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {JwtHelperService} from '@auth0/angular-jwt';
import { URLSearchParams } from '@angular/http';
import { ITokenResponse } from "./iTokenResponse";

@Injectable()
export class DataService {
    dataUrl: string = "http://restcountries.eu/rest/v2/name/india?fullText=true";
    testURl: string ="/ProjectREST/greeting";
    loginURL: string ="/ProjectREST/login";
    adminURL: string ="/ProjectREST/admin";

    constructor( private _http: HttpClient, private jwtHelperService:JwtHelperService ) {
        console.log("DataService Constructor");
    }
    
    private handleError( error: any ) {
        if ( error instanceof Response ) {//Backend Error
            //.json() parsing failed from server. This part is used for Dev only
            console.log( "Error:"+error.text() );
            return Observable.throw( error.text() );
        }
        //otherwise the server returned error code status
        console.log("Hello There");
        return Observable.throw( error || 'backend error' );

    }
    
    loggedIn() : boolean {
        const token: string = this.jwtHelperService.tokenGetter();
        if ( !token ) {
            return false;
        }
        const tokenExpired: boolean = this.jwtHelperService.isTokenExpired( token );
        return !tokenExpired;
    }
    
    tryLogin( username: String, password: String ): Observable<ITokenResponse> {
        //let search = new URLSearchParams();
        //search.set( 'user', 'moo' );
        //search.set( 'password', '123' );
        console.log( "Current Token:" + localStorage.getItem( 'token' ) );
        return this._http.post( this.loginURL, { username: username, password: password } )
            //.map(( response: Response ) => response.json() )
            .do( data => console.log( "Key:" + data ) )//data return in
            .catch( this.handleError );
    }
    
     testGetJson(): Observable<any> {
        return this._http
            .get( this.testURl )
            //.map(( response: Response ) => response.json() )
            .do(data => console.log("Success:"+data))//on success
            .catch( this.handleError );
    }
    
     getUsername(): string {
         const token: string = this.jwtHelperService.tokenGetter();
         let decoded: any = this.jwtHelperService.decodeToken( token );
         return decoded.name;
    }
}
