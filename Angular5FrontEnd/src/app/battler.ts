import { Role } from "./role";

export interface Battler {
    id:number
    name: string;
    level:number;
    currentExp:number;
    nextLvl:number
}
