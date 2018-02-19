import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { ArenaParticipant } from "./interfaces/arena.participant";
import { ArenaMatch } from "./interfaces/arena.match";

@Injectable()
export class WebsocketService {
    
    private serverUrl = 'http://localhost:8090/ProjectREST/socket'
    private stompClient;
    private stompArenaSubject : Subject<ArenaParticipant> = new Subject<ArenaParticipant>();
    private stompArenaMatchSubject : Subject<ArenaMatch> = new Subject<ArenaMatch>();
    private connectSubject: Subject<Boolean> = new Subject<Boolean>();
    private arenaSubscription;
    private arenaMatchSubscription;
    private mainSubscriptionChannel: string = "/topic";
    private arenaParticipantChannel: string = this.mainSubscriptionChannel + "/arena/participant";
    private arenaMatchChannel: string = this.mainSubscriptionChannel + "/arena/match/";
    private isConnected: boolean = false;

  constructor() { }
  
  initializeWebSocketConnection() :void{
      const ws:SockJS =  SockJS(this.serverUrl);
      this.stompClient  = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function(frame) {
          console.log("client Websocket is now connected.");
          that.connectSubject.next(true);
          that.isConnected=true;
          that.initArenaSubscription();
      },function(message){
          //Websocket Connection lost
          alert("unable to open websocket connection on the target server.Connection was temporarly lost or Server may be down");
      });
    }
  
  private initArenaSubscription(): void {
      let that = this;
      this.arenaSubscription = that.stompClient.subscribe( this.arenaParticipantChannel, ( message: any ) => {
          let battler: ArenaParticipant = JSON.parse( message.body );
          that.stompArenaSubject.next( battler );
          //console.log("Message Received from Server:"+battler);
      } );
  }
  
  initArenaMatchSubscription( matchId: string ): void {
      let that = this;
      this.arenaMatchSubscription = that.stompClient.subscribe( this.arenaMatchChannel + matchId, ( message: any ) => {
          let match: ArenaMatch = JSON.parse( message.body );
          that.stompArenaMatchSubject.next( match );
          console.log("Message Received from Server:"+match);
      } );
  }
      
  getArenaParticipantObservable():Observable<ArenaParticipant>{
      return this.stompArenaSubject.asObservable();
  }
  
  getArenaMatchObservable():Observable<ArenaMatch>{
      return this.stompArenaMatchSubject.asObservable();
  }
  
  getConnectionObservable():Observable<Boolean>{
      return this.connectSubject.asObservable();
  }
  
  disconnect(): void{
      this.stompClient.disconnect();
  }
  
  isWebsocketConnected(): boolean {
      return this.isConnected;
  }
}
