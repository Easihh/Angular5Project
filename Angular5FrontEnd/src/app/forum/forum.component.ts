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
    showPrevPage: boolean;
    isCreatingTopic: boolean = false;
    @ViewChild( 'topicBtn' ) topicBtn;
    

    constructor( private route: ActivatedRoute, private dataService: DataService ) { 
    }
    
    
    
    private initTopics() {
        //retrieve top perPageTopic from DB offset by page number 
        //i.e  page 2 should return topic 21-40 with 20 topics per page
        this.dataService.getForumTopics().subscribe(( data ) => {
            this.topics = data;
            this.topicCount = data.length;
            this.initTimestamp();//currently read from topic instead of replies;
        } );
    }
    private initTimestamp() {
        for ( let i = 0; i < this.topics.length; i++ ) {
            let lastReplyDate = new Date( this.topics[i].created )
            let date = new Date();
            let currentTime = date.valueOf() / 1000 | 0;
            let lastReplyTime = lastReplyDate.valueOf() /1000 |0;
            let timeDifferenceInSeconds = currentTime - lastReplyTime;
            if ( timeDifferenceInSeconds < 60 ) {
                this.topics[i].created = timeDifferenceInSeconds + "s";
            }
            else if ( timeDifferenceInSeconds < 3600 ) {
                this.topics[i].created = ( timeDifferenceInSeconds / 60 | 0 ) + "m";
            }
            else if ( timeDifferenceInSeconds < 3600 * 24 ) {
                this.topics[i].created = ( timeDifferenceInSeconds / 3600 | 0 ) + "h";
            }
            else {
                let datePipe = new DatePipe( "en-US" );
                this.topics[i].created = datePipe.transform( lastReplyDate, 'MMM dd, yyyy' );
            }
        }
    }  
    ngOnInit(): void {
        console.log("ngOnInit was called.");
        
        this.route.params.subscribe(params=>{
            let pageNumber = params[ 'id' ];
            if ( pageNumber == null ) {
                //we are in the main forum page
                this.currentPage = 1;
            }
            else {
                this.currentPage = parseInt( pageNumber );
            }
            this.showPrevPage = this.currentPage == 1 ? false : true;
            
            this.initTopics();
        });
    }
    
    increasePage(){
        this.currentPage++;
    }
    
    showTopicForm(){
        this.topicBtn.nativeElement.blur();
        this.isCreatingTopic = !this.isCreatingTopic;
    }
        
    createTopic( title: String, topicBody: String ): void {
        this.isCreatingTopic = false;
        this.dataService.createNewTopic( title, topicBody)
        .subscribe(
        res => {
            //Topic Creation Succeeded,refresh page data so we see it     
            this.initTopics();
            console.log( res );
        },
        error => console.log( "ERROR:" + error )
        );
    }
}