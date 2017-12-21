import { Component, OnInit,ViewChild } from '@angular/core';
import { Topic } from "../topic";
import { ActivatedRoute } from "@angular/router";

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
    

    constructor(private route: ActivatedRoute) { 
        this.initTopics();
      //followed by retrieving count of all topics from DB for pagination logic
        this.topicCount = 9;
        this.initPagination();//should be only after return call from db for data  
    }
    
    
    
    private initTopics() {
        //retrieve top perPageTopic from DB
        for ( let i = 10000; i < 10000 + this.perPageTopic; i++ ) {
            this.topics.push( new Topic( i, "New Topic Created", 0, "Test", "Now" ) );
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