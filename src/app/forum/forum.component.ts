import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['../css/bootstrap.css','../css/custom.css']
})
export class ForumComponent  implements OnInit{
    
    originalTopicList: any[]
    topicList: any[];
    perPageMaxListPlayer: number;
    currentPage: number;
    maxPage: number;
    

    constructor() { 
        this.initData();
        this.initPagination();//should be only after return call from db for data
        this.refresh();
    }
    
    private initData() {
        this.originalTopicList = [];
        for ( let i = 1; i < 9; i++ ) {
            let item: any = {
                rank: i,
                name: "Name" + i
            };
            this.originalTopicList.push( item )
        }
    }
    
    private initPagination() {
        this.currentPage = 1;
        this.perPageMaxListPlayer = 5;
        
        let rem = this.originalTopicList.length % this.perPageMaxListPlayer;
        console.log( "rem:" + rem );
        let total = ( this.originalTopicList.length - rem ) / this.perPageMaxListPlayer;
        console.log( "Total:" + total );
        this.maxPage = rem == 0 ? total : total += 1;
    }
    
    private refresh(): void {
        let start = ( this.currentPage - 1 ) * this.perPageMaxListPlayer;
        let end = start + this.perPageMaxListPlayer;
        this.topicList = this.originalTopicList.slice( start, end )
    }

    ngOnInit(): void {}
    
    nextPage(): void {
        this.currentPage++;
        this.refresh();
    }
    
    prevPage(): void {
        this.currentPage--;
        this.refresh();
    }
    
    showPreviousPageBtn(): boolean {
        return this.currentPage != 1;
    }
    
    showNextPageBtn(): boolean {
        return this.currentPage +1 == this.maxPage;
    }
    
    test( event: Event ): void {
        console.log("Click Row Received.")
    }
}