import { Component, OnInit, ViewChildren, ElementRef, ViewChild, QueryList } from '@angular/core';
import { Battler } from "../battler";
import { DataService } from "../data.service";
import { ArenaBattle } from "../arena.battle";
import { ArenaMatch } from "../arena.match";
import { ActivatedRoute, Router } from "@angular/router";
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
   private subscriptionInitCalled = false;

  constructor(private router:Router,private websocketService:WebsocketService,private dataService:DataService,private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(( data: any ) => {
          let arenaMatch: ArenaMatch = this.route.snapshot.data['arenaMatch'];
          this.enemyBattler = arenaMatch.mainBattler;
          this.matchId = arenaMatch.matchId;
          this.arenaBattles = arenaMatch.arenaBattles;
          this.attackIsDisabled = arenaMatch.matchStatus == "ENDED" ? true : false;
          this.matchStatusText = this.attackIsDisabled ? "Ended" : "Ongoing";
          
          //this is due to manual page reload possible race condition with Websocket connection and subscription on this dynamic page
          if(this.websocketService.isWebsocketConnected()){
              this.initSubscription();
          }
          else {
              let connection = this.websocketService.getConnectionObservable().subscribe( data => {
                  this.initSubscription();
              } );
              setTimeout(() => this.websocketConnectionTimeOutDelay( connection ), 5000 );
          }
      } );
  }
  
  private initSubscription():void{
      console.log( "websocket connection is ready" );
      this.subscribeToArenaMatch();
      this.subscriptionInitCalled = true;
  }
  
  /**
   * Since Websocket initial connection is on main app component init and is done async and that
   * it must be completed in order to subscribe to ArenaMatch, we subscribe to connection in the init
   * phase of this component and wait for it to emit a subject value before trying to subscribe to AreneMatch.
   * 
   * It is possible however that before we subscribe to the connection but after reading connection state, that the websocket has finished its initialization
   * therefore the observable won't emit subject value anymore so our subscription would never happen, hence the timeout
   * and below function.
   * 
   * the above case should only happen when a client manually refresh a page that subscribe to a dynamic topic on init since
   * that cannot be added to Websocket connection method unlike ArenaSubscription.
   */
  private websocketConnectionTimeOutDelay(connection:any):void{
      connection.unsubscribe();
      if ( this.websocketService.isWebsocketConnected() && !this.subscriptionInitCalled ) {
          console.log("websocket is fully connected but ArenaMatch was not subscribed to, subscribing.");  
          this.subscribeToArenaMatch();
          return;
      }
      if(!this.websocketService.isWebsocketConnected()){
          alert("websocket is still not fully connected after timeout delay.");        
      }
  }
  
  attack(): void {
      if(this.enemyBattler.name==this.dataService.getPlayer().name){
          alert("Cannot Attack Yourself");
          return;
      }
      this.dataService.arenaBattle(this.matchId).subscribe( battleLog => {
          console.debug("Log:"+battleLog);
          let logId: number = battleLog.id;
          this.router.navigate( ["/arena/match/" + this.matchId + "/log/" + logId] );
      },
      err =>{
          console.log( "Error during battle in match:" + this.matchId + " " + err.error.errorMessage );
          this.alertMessages.push( new PopupAlert( this.alertMessages.length, err.error.errorMessage ) );
          }
       );
  }
  
  private subscribeToArenaMatch():void {
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
