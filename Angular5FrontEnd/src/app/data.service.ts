import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ICountry } from './icountry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {JwtHelperService} from '@auth0/angular-jwt';
import { URLSearchParams } from '@angular/http';
import { ITokenResponse } from "./iTokenResponse";
import { Topic } from "./topic";
import { TopicReply } from "./topicReply";
import { TopicReplyWrapper } from "./topicReplyWrapper";

@Injectable()
export class DataService {
    getTopicURL: string ="/ProjectREST/forum";
    getTopicRepliesURL: string ="/ProjectREST/forum/topic";
    createNewUserURL: string ="/ProjectREST/register";
    createTopicURL: string ="/ProjectREST/auth/forum/topic/create";
    createTopicReplyURL: string ="/ProjectREST/auth/forum/topic/reply/create";
    loginURL: string ="/ProjectREST/login";
    adminURL: string ="/ProjectREST/admin";

    constructor( private _http: HttpClient, private jwtHelperService:JwtHelperService ) {
        console.log("DataService Constructor");
    }
    
    private handleError( error: any ) {
        if ( error instanceof Response ) {//Backend Error
            //.json() parsing failed from server
            console.log( "Error:"+error.text() );
            return Observable.throw( error.text() );
        }
        //otherwise the server returned error code status
        console.log("Hello There");
        return Observable.throw( error );
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
    
    getForumTopics( pageNumber: number ): Observable<Topic[]> {
        let params = new HttpParams();
        params = params.append( "pageNumber", pageNumber.toString() );
        return this._http
            .get( this.getTopicURL, { params: params } )
            //.do( data => console.log( "Success:" + data ) )//on success
            .catch( this.handleError );
    }
    
    getTopicReplies(topicId:number, pageNumber: number ): Observable<TopicReplyWrapper> {
        let params = new HttpParams();
        params = params.append( "pageNumber", pageNumber.toString() );
        params = params.append( "topicId", topicId.toString() );
        return this._http
            .get( this.getTopicRepliesURL, { params: params } )
            //.do( data => console.log( "Success:" + data ) )//on success
            .catch( this.handleError );
    }
     
     
     createNewTopic( title: String, body: String ): Observable<any> {
         return this._http.put( this.createTopicURL, { title: title, body: body } )
         .do( data => console.log( "Topic:" + data ) )//data return in
         .catch( this.handleError );
     }
     
     createNewTopicReply( topicId: number, body: String ): Observable<any> {
         return this._http.put( this.createTopicReplyURL, { topicId: topicId, body: body } )
         .do( data => console.log( "TopicReply:" + data ) )//data return in
         .catch( this.handleError );
     }
    
     getUsername(): string {
         const token: string = this.jwtHelperService.tokenGetter();
         let decoded: any = this.jwtHelperService.decodeToken( token );
         return decoded.name;
    }
     
     createNewUser(name:string,password:string):Observable<any>{
         return this._http.put( this.createNewUserURL, { username: name, password: password } )
         .do( data => console.log( "createUser:" + data ) )//data return in
         .catch( this.handleError );
     }
}
