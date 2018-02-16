import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit, Input, ElementRef } from '@angular/core';
import { RankedPlayer} from './ranked-player';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";
import { WebsocketService } from "./websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['css/bootstrap.css']
})
export class AppComponent implements OnInit {
    
    username: string;
    isOnline: boolean = false;
    private lastPoppedUrl: string;
    private currentUrl:string;
    private yScrollStack: number[] = [];
    constructor(private websocketService:WebsocketService, private dataService: DataService, el: ElementRef,private router: Router, private location: Location ) { this.init();}
    
    init() {}
    
    ngOnInit(): void {
 
        let isOnline = this.dataService.loggedIn();
        //on manual page reload since that does not destroy session token..
        if ( isOnline ) {
            this.username = this.dataService.getUsername();
            //service cached data will be wiped; need to reload player data
            this.dataService.retrievePlayer().subscribe(battler=>{
                this.dataService.setPlayer(battler);
            })
            this.isOnline = true;
            this.initWebsocket();
        }
        
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                this.currentUrl=ev.url;
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
    }
           
    register() {
        this.dataService.createNewUser( "Admin", "1234" )
        .subscribe( data => {
            console.log("UserCreated.");
        },
        error => console.log( "Error Creating User:" + error )
        );
    }
    
    /* Event from login form to tell main component to reload login form since user has logged in*/
    initLogIn( event: any ) {
        this.username = event.username;
        this.isOnline = true
        this.initWebsocket();
    }
    
    initWebsocket():void{
        this.websocketService.initializeWebSocketConnection();
    }
    
    logout() {
        sessionStorage.removeItem( "token" );
        this.isOnline = false;
        this.username = "";
        this.websocketService.disconnect();
        console.log( "navigating to:" + this.currentUrl );
        /*reload current page as we may be for example in topic-reply page which requires login to post.
        this will trigger refresh data method on the component if its setup.*/
        this.router.navigateByUrl( this.currentUrl );
    }
}
