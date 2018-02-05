import { Component, OnDestroy } from '@angular/core';
import { DataService } from "../data.service";
import { Subject } from "rxjs/Rx";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Topic } from "../topic";
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['../css/bootstrap.css']
})


export class AboutComponent implements OnDestroy{
    
    chatSubscription:any;
    testArr:Topic[]=[];
    
    ngOnDestroy(): void {
        this.stompClient.unsubscribe("/chat");
        console.log("I was destroyed.");
    }
    
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
            that.chatSubscription=that.stompClient.subscribe("/chat", (message:any) => {
               let parsedObj=JSON.parse(message.body);
               that.testArr.push(parsedObj);
              console.log("Message Received from Server:"+parsedObj);
          });
        },function(message){
            //Websocket Connection lost
            alert("unable to open websocket connection on the target server.Connection was temporarly lost or Server may be down");
        });
      }
    
    test(){
        this.chatSubscription.unsubscribe();
        console.log("stormClientData:"+this.stompClient);
        //this.stompClient.send("/app/send/message",{},"Testing Stuff");
    }
    
    
}
