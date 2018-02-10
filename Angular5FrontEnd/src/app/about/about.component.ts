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
    
    constructor(private websocketService:WebsocketService,private dataService:DataService){}
    
    ngOnInit(): void {
        if ( this.dataService.getPlayer() == null ) {
            this.dataService.retrievePlayer().subscribe(data=>{
                this.dataService.setPlayer(data);
                this.initArenaParticipation();
            });
        }
        else {
            console.log("wtf:"+this.dataService.getPlayer );
            this.initArenaParticipation();
        }
          
        this.websocketService.getObservable().subscribe(data=>{
            this.battlers.push(data);
        })
    }
    
    initArenaParticipation(): void {
        let status: number = this.dataService.getPlayer().playerStatus;
        this.isArenaParticipant = status == 1 ? true : false;
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
        this.dataService.enterArena().subscribe(data=>{
            this.isArenaParticipant=true ;
        });
    }
    
    leaveArena(){
        //todo:call backend to to update status +send info to other player
        this.dataService.leaveArena().subscribe(data=>{
            this.isArenaParticipant=false ;
        });
    }
    
}
