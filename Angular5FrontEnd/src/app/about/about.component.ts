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
    isArenaParticipant: boolean;
    
    constructor(private websocketService:WebsocketService){}
    
    ngOnInit(): void {
        this.isArenaParticipant = localStorage.getItem( "arenaKey" ) ? true : false;
            
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
    
    enterArena(){
        //todo:call backend to to update status +send info to other player
        localStorage.setItem("arenaKey","true");
    }
    
}
