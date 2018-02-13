import { Role } from "./role";
import { Battler } from "./battler";
import { ArenaBattle } from "./arena.battle";
import { ArenaMatch } from "./arena.match";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ArenaMatchResolver implements Resolve<ArenaMatch>{
    
    constructor(private dataService:DataService){}
    
    resolve(route: ActivatedRouteSnapshot):Observable<ArenaMatch> {
        console.log("inside resolve for ArenaMatch")
        let matchId = route.params['matchId'];

        return this.dataService.findArenaMatch(matchId).map(arenaMatch =>{
             return arenaMatch;
         })
         .catch(error =>{
             //Usually when Server is down/error response from server.
             let errMessage=(error.message)? error.message: error.status? error.status+"-"+error.statusText:"Server Error";
             console.log( "ArenaMatch with id:"+matchId+" retrieval error:" + errMessage );
             return Observable.of(null);
         }).first();
    }
    
}
