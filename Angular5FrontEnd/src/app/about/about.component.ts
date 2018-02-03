import { Component } from '@angular/core';
import { DataService } from "../data.service";
import { Subject } from "rxjs/Rx";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['../css/bootstrap.css']
})


export class AboutComponent {
    
    private serverUrl = 'http://localhost:8090/ProjectREST/socket'
    private title = 'WebSockets chat';
    private stompClient;
    
    constructor(dataService:DataService){
        console.log("init websocket");
        this.initializeWebSocketConnection();
    }
    
    initializeWebSocketConnection(){
        const ws:SockJS =  SockJS(this.serverUrl);
        this.stompClient  = Stomp.over(ws);
        let that = this;
        this.stompClient.connect({}, function(frame) {
            that.stompClient.subscribe("/chat", (message) => {
              console.log("Message Received from Server:"+message)
          });
        });
      }
    
    test(){
        this.stompClient.send("/app/send/message",{},"Testing Stuff");
    }
}
