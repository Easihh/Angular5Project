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
    
    arenaBattlers:Battler[]=[];
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
            this.initArenaParticipation();
        }
          
        this.loadArenaParticipants();
    }
    
    loadArenaParticipants() {
        this.dataService.getArenaParticipants().subscribe( battlers => {
            this.arenaBattlers = battlers;
            this.subscribeToArenaParticipants();
        } )
    }
    
    subscribeToArenaParticipants() {
        this.websocketService.getObservable().subscribe( battler => {
            if ( battler.playerStatus == 1 ) {
                this.arenaBattlers.push( battler );
            }
            else {
                this.arenaBattlers = this.arenaBattlers.filter( item => battler.id != item.id );
            }
        } )
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
