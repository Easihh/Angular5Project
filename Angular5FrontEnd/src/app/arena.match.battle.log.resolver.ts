import { Role } from "./role";
import { Battler } from "./battler";
import { ArenaBattle } from "./arena.battle";
import { ArenaMatch } from "./arena.match";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ArenaMatchBattleLogResolver implements Resolve<ArenaBattle>{
    
    constructor(private dataService:DataService){}
    
    resolve(route: ActivatedRouteSnapshot):Observable<ArenaBattle> {
        console.log("inside resolve for ArenaMatchBattleLogResolver");
        
        let logId = route.params['logId'];
        return this.dataService.findArenaMatchBattleLog(logId).map(battleLog =>{
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
