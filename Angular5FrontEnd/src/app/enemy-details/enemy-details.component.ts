import { Component, OnInit, ViewChildren, ElementRef, ViewChild, QueryList } from '@angular/core';
import { Battler } from "../battler";
import { DataService } from "../data.service";
import { ArenaBattle } from "../arena.battle";
import { ArenaMatch } from "../arena.match";
import { ActivatedRoute } from "@angular/router";
import { PopupAlert } from "../popup.alert";
import { HttpErrorResponse } from "@angular/common/http";

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
   attackIsDisabled: boolean;
   alertMessages:PopupAlert[]=[];

  constructor(private dataService:DataService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(( data: any ) => {
          let arenaMatch: ArenaMatch = this.route.snapshot.data['arenaMatch'];
          this.enemyBattler = arenaMatch.mainBattler;
          this.matchId = arenaMatch.matchId;
          this.arenaBattles = arenaMatch.arenaBattles;
          this.attackIsDisabled = arenaMatch.matchStatus == 1 ? false : true;
          this.matchStatusText = this.attackIsDisabled ? "Ended" : "Ongoing";
      } );
  }
  
  attack(): void {
      if(this.enemyBattler.name==this.dataService.getPlayer().name){
          alert("Cannot Attack Yourself");
          return;
      }
      this.dataService.arenaBattle(this.matchId).subscribe( arenaMatch => {
          this.arenaBattles = arenaMatch.arenaBattles;
          this.attackIsDisabled = arenaMatch.matchStatus == 1 ? false : true;
          this.matchStatusText = this.attackIsDisabled ? "Ended" : "Ongoing";
      },
      err =>{
          console.log( "Error during battle in match:" + this.matchId + " " + err.error.errorMessage );
          this.alertMessages.push( new PopupAlert( this.alertMessages.length, err.error.errorMessage ) );
          }
       );
  }

  close( alertIndex: number ) {
      console.log( "Closing alert:" + alertIndex );
      this.alertMessages = this.alertMessages.filter( alert => alert.id != alertIndex );
  }
}
