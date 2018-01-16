import { Component } from '@angular/core';
import { DataService } from './data.service';
import { OnInit, Input, ElementRef } from '@angular/core';
import { ICountry } from './icountry';
import { RankedPlayer} from './ranked-player';
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Location, PopStateEvent } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['css/bootstrap.css']
})
export class AppComponent implements OnInit {
    
    username: string;
    isOnline: boolean = false;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    
    @Input('testData') testData:string;
    constructor( private dataService: DataService, el: ElementRef,private router: Router, private location: Location ) { this.init();}
    
    init() {}
    
    ngOnInit(): void {
        let isOnline = this.dataService.loggedIn();
        if ( isOnline ) {
            this.username = this.dataService.getUsername();
            this.isOnline = true;
        }
        
        this.location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this.router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
    }
          
    initLogIn( event: any ) {
        this.username = event.username;
        this.isOnline = true
    }
    
    register() {
        this.dataService.createNewUser( "Admin", "1234" )
        .subscribe( data => {
            console.log("UserCreated.");
        },
        error => console.log( "Error Creating User:" + error )
        );
    }
    
    logout() {
        localStorage.removeItem( "token" );
        this.isOnline = false;
        this.username = "";
    }
}
