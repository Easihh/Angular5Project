import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subject } from "rxjs/Rx";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Topic } from "../topic";
import { WebsocketService } from "../websocket.service";
import { Battler } from "../battler";
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['../css/bootstrap.css']
})


export class AboutComponent implements OnInit,OnDestroy{
    
    battlers:Battler[]=[];
    
    constructor(private websocketService:WebsocketService){}
    
    ngOnInit(): void {
        this.websocketService.getObservable().subscribe(data=>{
            this.battlers.push(data);
        })
    }
        
    ngOnDestroy(): void {
        console.log("I was destroyed.");
    }
        
    test(){
        this.websocketService.disconnect();
        //this.stompClient.send("/app/send/message",{},"Testing Stuff");
    }
    
    testing(id:number){
        alert("Clicked Id:"+id);
    }
    
}
