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
    
    title = 'app';
    list: any[] = ["String1", "String2"];
    countryObj: ICountry;
    errorMessage: string;
    selectedRow: number;
    perPageMaxListPlayer: number;
    currentPage: number;
    maxPage: number;
    username: string;
    isOnline: boolean = false;
    playerList: RankedPlayer[] = [
        { "rank": 1, "name": "player1" },
        { "rank": 2, "name": "player2" },
        { "rank": 3, "name": "player3" },
        { "rank": 4, "name": "player4" },
        { "rank": 5, "name": "player5" },
        { "rank": 6, "name": "player6" },
        { "rank": 7, "name": "player7" },
        { "rank": 8, "name": "player8" },
        { "rank": 9, "name": "player9" },
        { "rank": 10, "name": "player10" }
                             ];
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    
    @Input('testData') testData:string;
    constructor( private dataService: DataService, el: ElementRef,private router: Router, private location: Location ) { this.init();}
    
    init() {
        this.currentPage = 1;
        this.perPageMaxListPlayer = 5;
        let length: number = this.playerList.length;
        let expectedPageNumber: number = length / this.perPageMaxListPlayer;
        this.maxPage = length % this.perPageMaxListPlayer == 0 ? expectedPageNumber : expectedPageNumber++;
        this.refresh();
        console.log("initialized");
    }
    
    refresh(): void {
        let startIndex = ( this.currentPage - 1 ) * this.perPageMaxListPlayer;
        let endIndex = startIndex + this.perPageMaxListPlayer;
        //this.filteredList = this.playerList.slice( startIndex, endIndex );

        console.log( "StartIndex:" + startIndex + " endIndex:" + endIndex );
        
        console.log(this.testData);
    }

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
    
    get getlist(): string[] {
        let retVal: string[] = ["Test","Test2"];
        return retVal;
    }
    
    getHeader(): string[] {
        let header: string[] = ["Rank", "Name"];
        console.log( "getHeader function Called." );
        return header;
    }
    
    getData(): any[] {
        let retVal: any[] = [
            { rank: "7", name: "Enrico" },
            { rank: "5", name: "PlayerX" }
        ]
        console.log("getData function Called.");
        return retVal;
    }
    
    setSelectedRow( index: number ): void {
        this.selectedRow = index;
        console.log( "row:" + this.selectedRow + " has been selected." );
    }
    
    initLogIn( event: any ) {
        this.username = event.username;
        this.isOnline = true
        console.log( "LoggedIn Done." );
    }
    
    register() {
        this.dataService.createNewUser( "Admin", "1234" )
        .subscribe( data => {
            console.log("UserCreated.");
        },
        error => console.log( "Error Creating User:" + error )
        );
    }
    
    clearToken(){
        localStorage.removeItem("token");
    }
}
