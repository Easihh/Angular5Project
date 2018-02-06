import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class WebsocketService {
    
    private serverUrl = 'http://localhost:8090/ProjectREST/socket'
    private stompClient;
    private stompSubject : Subject<any> = new Subject<any>();
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
          let parsedObj=JSON.parse(message.body);
          that.stompSubject.next(parsedObj);
         console.log("Message Received from Server:"+parsedObj);
     });
  }
      
  getObservable():Observable<any>{
      return this.stompSubject.asObservable();
  }
  
  disconnect(): void{
      this.stompClient.disconnect();
  }
}
