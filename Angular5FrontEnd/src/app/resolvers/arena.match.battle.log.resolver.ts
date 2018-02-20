import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { DataService } from "../data.service";
import { ArenaBattle } from "../interfaces/arena.battle";
import { ArenaService } from "../arena.service";

@Injectable()
export class ArenaMatchBattleLogResolver implements Resolve<ArenaBattle>{
    
    constructor(private arenaService:ArenaService,private dataService:DataService){}
    
    resolve(route: ActivatedRouteSnapshot):Observable<ArenaBattle> {
        console.log("inside resolve for ArenaMatchBattleLogResolver");
        
        let logId = route.params['logId'];
        return this.arenaService.findArenaMatchBattleLog(logId).map(battleLog =>{
             return battleLog;
         })
         .catch(error =>{
             //Usually when Server is down/error response from server.
             let errMessage=(error.message)? error.message: error.status? error.status+"-"+error.statusText:"Server Error";
             console.debug( "ArenaMatchLog with id:"+logId+" retrieval error:" + errMessage );
             return Observable.of(null);
         }).first();
    }
    
}
