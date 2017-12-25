import { Component, OnInit,ViewChild } from '@angular/core';
import { Topic } from "../topic";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['../css/bootstrap.css','./forum-component.css']
})
export class ForumComponent  implements OnInit{
    
    perPageTopic: number = 5;
    topicCount: number;
    currentPage: number;
    maxPage: number;
    topics: Topic[] = [];
    showNextPage: boolean;
    showPrevPage: boolean;
    @ViewChild( 'topicBtn' ) topicBtn;
    

    constructor( private route: ActivatedRoute, private dataService: DataService ) { 
        this.initTopics();
    }
    
    
    
    private initTopics() {
        //retrieve top perPageTopic from DB offset by page number 
        //i.e  page 2 should return topic 21-40 with 20 topics per page
        this.dataService.getForumTopics().subscribe(( data ) => {
            this.topics = data;
            this.topicCount = data.length;
            this.initTimestamp();//currently read from topic instead of replies;
            this.initPagination();
        } );
    }
    private initTimestamp() {
        for ( let i = 0; i < this.topics.length; i++ ) {
            let lastReplyDate = new Date( this.topics[i].created )
            let date = new Date();
            let currentTime = date.valueOf() / 1000 | 0;
            let lastReplyTime = lastReplyDate.valueOf();
            let timeDifferenceInSeconds = currentTime - lastReplyTime;
            if ( timeDifferenceInSeconds < 60 ) {
                this.topics[i].created = timeDifferenceInSeconds + "s";
            }
            else if ( timeDifferenceInSeconds < 3600 ) {
                this.topics[i].created = ( timeDifferenceInSeconds / 60 | 0 ) + "m";
            }
            else {
                lastReplyDate.setTime( lastReplyTime * 1000 );
                let datePipe = new DatePipe( "en-US" );
                this.topics[i].created = datePipe.transform( lastReplyDate, 'MMM dd, yyyy' );
            }
            console.log( "TimeDifference(s):" + ( timeDifferenceInSeconds ) );
        }
    }
    private initPagination() {
        this.currentPage = 1;
        
        let rem = this.topicCount % this.perPageTopic;
        console.log( "rem:" + rem );
        let total = ( this.topicCount - rem ) / this.perPageTopic;
        console.log( "Total:" + total );
        this.maxPage = rem == 0 ? total : total += 1;
    }
    
    ngOnInit(): void {
        let pageNumber = this.route.snapshot.paramMap.get( 'id' );
        if ( pageNumber == null ) {
            //we are in the main forum page
            this.currentPage = 1;
            console.log("my page number is null");
        }
        else {
            this.currentPage = parseInt( pageNumber );
        }

        this.showNextPage = this.currentPage == this.maxPage ? false : true;
        this.showPrevPage = this.currentPage == 1 ? false : true;
    }
        
    createTopic() : void{
        this.topicBtn.nativeElement.blur();
        this.topics.push(new Topic(57234,"New Topic Created",0,"Test","Now"));
    }
}