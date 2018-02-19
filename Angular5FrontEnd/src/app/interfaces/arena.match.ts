import { Role } from "./role";
import { Battler } from "./battler";
import { ArenaBattle } from "./arena.battle";

export interface ArenaMatch {
    
    matchId: string;
    mainBattler:Battler;
    matchStatus:string;
    arenaBattles:ArenaBattle[];
}
