import { Component, OnInit, ViewChildren, ElementRef, ViewChild, QueryList } from '@angular/core';
import { Battler } from "../battler";
import { DataService } from "../data.service";
import { ArenaBattle } from "../arena.battle";
import { ArenaMatch } from "../arena.match";
import { ActivatedRoute } from "@angular/router";
import { PopupAlert } from "../popup.alert";
import { HttpErrorResponse } from "@angular/common/http";
import { WebsocketService } from "../websocket.service";

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

  constructor(private websocketService:WebsocketService,private dataService:DataService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(( data: any ) => {
          let arenaMatch: ArenaMatch = this.route.snapshot.data['arenaMatch'];
          this.enemyBattler = arenaMatch.mainBattler;
          this.matchId = arenaMatch.matchId;
          this.arenaBattles = arenaMatch.arenaBattles;
          this.attackIsDisabled = arenaMatch.matchStatus == "ENDED" ? true : false;
          this.matchStatusText = this.attackIsDisabled ? "Ended" : "Ongoing";
          this.websocketService.getConnectionObservable().subscribe(data=>{
              console.log("websocket connection is ready");
              this.subscribeToArenaMatch();
          })
      } );
  }
  
  attack(): void {
      if(this.enemyBattler.name==this.dataService.getPlayer().name){
          alert("Cannot Attack Yourself");
          return;
      }
      this.dataService.arenaBattle(this.matchId).subscribe( arenaMatch => {
          //no need capture anything here as we will get info back from websocket subscription
          //as all other player on this match page will.
      },
      err =>{
          console.log( "Error during battle in match:" + this.matchId + " " + err.error.errorMessage );
          this.alertMessages.push( new PopupAlert( this.alertMessages.length, err.error.errorMessage ) );
          }
       );
  }
  
  private subscribeToArenaMatch() {
      this.websocketService.initArenaMatchSubscription(this.matchId);
      this.websocketService.getArenaMatchObservable().subscribe( arenaMatch => {
          this.arenaBattles = arenaMatch.arenaBattles;
          this.attackIsDisabled = arenaMatch.matchStatus == "ENDED" ? true : false;
          this.matchStatusText = this.attackIsDisabled ? "Ended" : "Ongoing";
      } )
  }

  close( alertIndex: number ) {
      console.log( "Closing alert:" + alertIndex );
      this.alertMessages = this.alertMessages.filter( alert => alert.id != alertIndex );
  }
}
