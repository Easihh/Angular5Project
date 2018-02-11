import { Component, OnInit } from '@angular/core';
import { Battler } from "../battler";
import { DataService } from "../data.service";

@Component({
  selector: 'app-enemy-details',
  templateUrl: './enemy-details.component.html',
  styleUrls: ['./enemy-details.component.css']
})
export class EnemyDetailsComponent implements OnInit {
    
   enemyBattler:Battler;
   matchId:string="Abadfxasd";

  constructor(private dataService:DataService) { }

  ngOnInit() {
      this.dataService.findArenaMatch(this.matchId).subscribe(battler=>{
          this.enemyBattler=battler.mainBattler;
      },
      err=>{
          console.log("error retrieving match with id:"+this.matchId);
      });
  }

}
