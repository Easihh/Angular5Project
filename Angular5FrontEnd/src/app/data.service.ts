import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {JwtHelperService} from '@auth0/angular-jwt';
import { URLSearchParams } from '@angular/http';
import { Battler } from "./interfaces/battler";
import { AuthenticationResponse } from "./interfaces/authenticationResponse";
import { News } from "./interfaces/news";

@Injectable()
export class DataService {

    private createNewUserURL: string = "/ProjectREST/register";
    private loginURL: string = "/ProjectREST/login";
    private adminURL: string = "/ProjectREST/admin";
    private getNewsURL: string = "/ProjectREST/news";
    private retrievePlayerURL: string = "/ProjectREST/auth/myBattler";
    private retrieveOtherPlayerURL: string = "/ProjectREST/auth/otherBattler";
    
    private playerInfo: Battler;

    constructor( private _http: HttpClient, private jwtHelperService:JwtHelperService ) {}
    
    setPlayer( battler: Battler ) {
        this.playerInfo = battler;
    }
    
    getPlayer(): Battler {
        return this.playerInfo;
    }
    
    private handleError( error: any ) {
        if ( error instanceof Response ) {
            //.json() parsing failed from server
            console.log( "Error:"+error.text() );
            return Observable.throw( error.text() );
        }
        //otherwise the server returned error code status
        console.log("Hello There");
        return Observable.throw( error );
    }
    
    loggedIn(): boolean {
        const token: string = this.jwtHelperService.tokenGetter();
        if ( !token ) {
            return false;
        }
        return true;
    }
    
    tryLogin( username: String, password: String ): Observable<AuthenticationResponse> {
        return this._http.post<AuthenticationResponse>( this.loginURL, { username: username, password: password } )
            //.do( data => console.log( "Key:" + data )//data return in
            .catch( this.handleError );
    }
    
     getUsername(): string {
         const token: string = this.jwtHelperService.tokenGetter();
         let decoded: any = this.jwtHelperService.decodeToken( token );
         return decoded.username;
    }
     
     createNewUser(name:string,password:string):Observable<any>{
         return this._http.put( this.createNewUserURL, { username: name, password: password } )
         .do( data => console.log( "createUser:" + data ) )//data return in
         .catch( this.handleError );
     }
                    
     /* Returns all info of the battler; used for logged player only*/
     retrievePlayer(): Observable<Battler> {
         return this._http.get( this.retrievePlayerURL )
         .catch( this.handleError );
     }
     
     /* returns info of a given player and may return hidden value as ??? if player 
      * should not be able to see them NYI?*/
     findBattler(userId: number): Observable<Battler> {
         let params = new HttpParams();
         params = params.append( "userId", userId.toString() );
         return this._http
             .get( this.retrieveOtherPlayerURL, { params: params } )
             .catch( this.handleError );
     }
          
     getNews():Observable<News[]>{
         return this._http.get(this.getNewsURL)
         .catch( this.handleError );
     }
}
