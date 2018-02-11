import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Battler } from "./battler";
import { ArenaParticipant } from "./arena.participant";

@Injectable()
export class WebsocketService {
    
    private serverUrl = 'http://localhost:8090/ProjectREST/socket'
    private stompClient;
    private stompSubject : Subject<ArenaParticipant> = new Subject<ArenaParticipant>();
    private topicSubscription;

  constructor() { }
  
  initializeWebSocketConnection() :void{
      const ws:SockJS =  SockJS(this.serverUrl);
      this.stompClient  = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function(frame) {
          that.initTopicSubscription();
      },function(message){
          //Websocket Connection lost
          alert("unable to open websocket connection on the target server.Connection was temporarly lost or Server may be down");
      });
    }
  
  private initTopicSubscription():void{
      let that=this;
      this.topicSubscription=that.stompClient.subscribe("/chat", (message:any) => {
          let battler:ArenaParticipant=JSON.parse(message.body);
          that.stompSubject.next(battler);
         //console.log("Message Received from Server:"+battler);
     });
  }
      
  getObservable():Observable<ArenaParticipant>{
      return this.stompSubject.asObservable();
  }
  
  disconnect(): void{
      this.stompClient.disconnect();
  }
}
