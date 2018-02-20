import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from "@angular/common/http";
import { ArenaMatch } from "./interfaces/arena.match";
import { Observable } from "rxjs/Observable";
import { ArenaBattle } from "./interfaces/arena.battle";
import { ArenaParticipant } from "./interfaces/arena.participant";
import { Battler } from "./interfaces/battler";

@Injectable()
export class ArenaService {

    private enterArenaURL: string = "/ProjectREST/auth/arena/enter";
    private leaveArenaURL: string = "/ProjectREST/auth/arena/leave";
    private arenaBattleURL: string = "/ProjectREST/auth/arena/battle";
    private getArenaMatchBattleLogURL: string = "/ProjectREST/auth/arena/battle/log";
    private getArenaMatchURL: string = "/ProjectREST/auth/arena/getMatch";
    private getArenaParticipantURL: string = "/ProjectREST/auth/arena/getParticipants";

    constructor( private _http: HttpClient ) { }

    private handleError( error: any ) {
        if ( error instanceof Response ) {
            //.json() parsing failed from server
            console.log( "Error:" + error.text() );
            return Observable.throw( error.text() );
        }
        //otherwise the server returned error code status
        console.log( "Hello There" );
        return Observable.throw( error );
  }
      
    /* returns info of a given battle and may return hidden value as ??? if player 
     * should not be able to see them NYI?*/
    findArenaMatch( matchId: string ): Observable<ArenaMatch> {
        let params = new HttpParams();
        params = params.append( "matchId", matchId.toString() );
        return this._http
            .get( this.getArenaMatchURL, { params: params } )
            .catch( this.handleError );
  }
  
    findArenaMatchBattleLog( logId: number ): Observable<ArenaBattle> {
        let params = new HttpParams();
        params = params.append( "logId", logId.toString() );
        return this._http.get( this.getArenaMatchBattleLogURL, { params: params } )
            .catch( this.handleError );
  }
  
    getArenaParticipants(): Observable<ArenaParticipant[]> {
        return this._http.get( this.getArenaParticipantURL )
            .catch( this.handleError );
  }
  
    arenaBattle( matchId: string ): Observable<ArenaBattle> {
        return this._http.post( this.arenaBattleURL, { matchId: matchId } )
            .catch( this.handleError );
  }
  
    /*2nd param needed(non-empty payload) in http put but server won't trust it
    and will instead read the name in the sent jwt token.*/
    enterArena(): Observable<Battler> {
        return this._http.put( this.enterArenaURL, { username: "username" } )
            .catch( this.handleError );
  }
  
    /*2nd param needed(non-empty payload) in http put but server won't trust it
    and will instead read the name in the sent jwt token.*/
    leaveArena(): Observable<Battler> {
        return this._http.put( this.leaveArenaURL, { username: "username" } )
            .catch( this.handleError );
  }
}
