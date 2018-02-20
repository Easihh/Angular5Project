import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { ArenaMatch } from "../interfaces/arena.match";
import { DataService } from "../data.service";
import { ArenaService } from "../arena.service";

@Injectable()
export class ArenaMatchResolver implements Resolve<ArenaMatch>{
    
    constructor(private arenaService:ArenaService,private dataService:DataService){}
    
    resolve(route: ActivatedRouteSnapshot):Observable<ArenaMatch> {
        console.log("inside resolve for ArenaMatch")
        let matchId = route.params['matchId'];

        return this.arenaService.findArenaMatch(matchId).map(arenaMatch =>{
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
