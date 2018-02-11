import { Role } from "./role";
import { Battler } from "./battler";

export interface ArenaMatch {
    
    matchId: string;
    mainBattler:Battler;
    matchStatus:number;
}
