import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Subject } from "rxjs/Rx";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Topic } from "../topic";
import { WebsocketService } from "../websocket.service";
import { Battler } from "../battler";
import { ArenaParticipant } from "../arena.participant";
@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['../css/bootstrap.css']
})


export class AboutComponent implements OnInit,OnDestroy{
    
    arenaBattlers:ArenaParticipant[]=[];
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
    
    attackFighter( id: number ) {
        if ( id == this.dataService.getPlayer().id ) {
            alert( "Cannot Attack yourself" );
        }
        else {
            this.dataService.arenaBattle( "" + id ).subscribe( data => {
                //receive http response OK status may reply something more later.
                console.log("received data from battle");
            },
            err=>{
                console.log("received error from battling id:"+id+ " "+err);
            })
        }
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
