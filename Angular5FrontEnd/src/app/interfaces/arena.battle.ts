
import { Battler } from "./battler";

export interface ArenaBattle {
    
    winnerBattler: Battler;
    attackerBattler:Battler;
    defenderBattler:Battler;
    id:number;
    combatLog:string;
}
