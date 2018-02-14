import { Component, OnInit } from '@angular/core';
import { Battler } from "../battler";
import { DataService } from "../data.service";
import { ArenaBattle } from "../arena.battle";
import { ArenaMatch } from "../arena.match";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-enemy-details',
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.css']
})
export class EnemyDetailsComponent implements OnInit {
    
   enemyBattler:Battler;
   arenaBattles:ArenaBattle[]=[];
   matchStatusText:string;
   private matchId:string;

  constructor(private dataService:DataService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(( data: any ) => {
          let arenaMatch: ArenaMatch = this.route.snapshot.data['arenaMatch'];
          this.enemyBattler = arenaMatch.mainBattler;
          this.matchId = arenaMatch.matchId;
          this.arenaBattles = arenaMatch.arenaBattles;
          this.matchStatusText = arenaMatch.matchStatus == 1 ? "Ongoing" : "Defeated";
      } );
  }
  
  attack(): void {
      this.dataService.arenaBattle(this.matchId).subscribe( arenaMatch => {
          this.arenaBattles = arenaMatch.arenaBattles;
          this.matchStatusText = arenaMatch.matchStatus == 1 ? "Ongoing" : "Defeated";
      },
      err => console.log( "Error during battle in match:" + this.matchId +" "+err)
       );
  }

}
