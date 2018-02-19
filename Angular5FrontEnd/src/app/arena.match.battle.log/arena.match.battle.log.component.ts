import { Component, OnInit } from '@angular/core';
import { ArenaBattle } from "../arena.battle";
import { ActivatedRoute, Router } from "@angular/router";
import { Battler } from "../battler";

@Component({
  selector: 'app-arena.match.battle.log',
  templateUrl: './arena.match.battle.log.component.html',
  styleUrls: ['./arena.match.battle.log.component.css']
})
export class ArenaMatchBattleLogComponent implements OnInit {
    
    battleWinner: Battler;
    attacker: Battler;
    defender: Battler;
    combatLog: string;
    matchId:string;
    logId:number;

  constructor(private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(( data: any ) => {
          let arenaMatch: ArenaBattle = this.route.snapshot.data['arenaMatchBattleLog'];
          this.battleWinner = arenaMatch.winnerBattler;
          this.attacker = arenaMatch.attackerBattler;
          this.defender = arenaMatch.defenderBattler;
          this.combatLog = arenaMatch.combatLog;
          this.logId=arenaMatch.id;
      } );
      this.route.params.subscribe( params => {
          this.matchId = params["matchId"];
      } );
  }
}
