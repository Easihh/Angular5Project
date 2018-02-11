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
import { News } from "./news";
import { AuthenticationResponse } from "./authenticationResponse";
import { Battler } from "./battler";
import { ArenaParticipant } from "./arena.participant";
import { ArenaMatch } from "./arena.match";

@Injectable()
export class DataService {

    createNewUserURL: string ="/ProjectREST/register";
    loginURL: string ="/ProjectREST/login";
    adminURL: string ="/ProjectREST/admin";
    getNewsURL: string ="/ProjectREST/news";
    enterArenaURL: string ="/ProjectREST/auth/arena/enter";
    leaveArenaURL: string ="/ProjectREST/auth/arena/leave";
    retrievePlayerURL: string ="/ProjectREST/auth/myBattler";
    retrieveOtherPlayerURL: string ="/ProjectREST/auth/otherBattler";
    getArenaParticipantURL: string ="/ProjectREST/auth/arena/getParticipants";
    getArenaMatchURL: string ="/ProjectREST/auth/arena/getMatch";
    arenaBattleURL: string ="/ProjectREST/auth/arena/battle";

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
     
     /*2nd param needed(non-empty payload) in http put but server won't trust it
     and will instead read the name in the sent jwt token.*/
     enterArena():Observable<Battler>{
         return this._http.put( this.enterArenaURL,{username: this.getUsername()})
         .catch( this.handleError );
     }
     
     /*2nd param needed(non-empty payload) in http put but server won't trust it
     and will instead read the name in the sent jwt token.*/
     leaveArena(): Observable<Battler> {
         return this._http.put( this.leaveArenaURL, { username: this.getUsername() } )
             .catch( this.handleError );
     }
     
     getArenaParticipants():Observable<ArenaParticipant[]>{
         return this._http.get(this.getArenaParticipantURL)
         .catch( this.handleError );
     }
     
     arenaBattle( id: String ): Observable<any> {
         return this._http.post( this.arenaBattleURL, { id: id } )
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
     
     /* returns info of a given battle and may return hidden value as ??? if player 
      * should not be able to see them NYI?*/
     findArenaMatch(matchId: string): Observable<ArenaMatch> {
         let params = new HttpParams();
         params = params.append( "matchId", matchId.toString() );
         return this._http
             .get( this.getArenaMatchURL, { params: params } )
             .catch( this.handleError );
     }
     
     getNews():Observable<News[]>{
         return this._http.get(this.getNewsURL)
         .catch( this.handleError );
     }
}
