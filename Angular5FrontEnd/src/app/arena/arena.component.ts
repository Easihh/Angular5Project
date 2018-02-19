import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subject } from "rxjs/Rx";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WebsocketService } from "../websocket.service";
import { Router } from "@angular/router";
import { ArenaParticipant } from "../interfaces/arena.participant";
@Component({
  selector: 'arena',
  templateUrl: './arena.component.html',
  styleUrls: ['../css/bootstrap.css']
})


export class ArenaComponent implements OnInit,OnDestroy{
    
    arenaBattlers:ArenaParticipant[]=[];
    isArenaParticipant: boolean;
    
    constructor(private websocketService:WebsocketService,private dataService:DataService,private router:Router){}
    
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
        this.websocketService.getArenaParticipantObservable().subscribe( battler => {
            if ( battler.playerStatus == 1 ) {
                this.arenaBattlers.push( battler );
            }
            else {
                this.arenaBattlers = this.arenaBattlers.filter( item => battler.name != item.name );
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
        
    stopUpdate(){
        this.websocketService.disconnect();
        //this.stompClient.send("/app/send/message",{},"Testing Stuff");
    }
    
    prepareAttack( participant: ArenaParticipant ) {
        this.router.navigate( ["/arena/match/" + participant.matchId] );
    }
    
    enterArena(){
        this.dataService.enterArena().subscribe(data=>{
            this.isArenaParticipant=true ;
        });
    }
    
    leaveArena(){
        this.dataService.leaveArena().subscribe(data=>{
            this.isArenaParticipant=false ;
        });
    }
    
}
