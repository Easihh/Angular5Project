import { Component, OnInit,ViewChild } from '@angular/core';
import { Topic } from "../topic";
import { ActivatedRoute, Router } from "@angular/router";
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
    

    constructor( private route: ActivatedRoute, private dataService: DataService, private router:Router ) { 
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
        /* Have to subscribe here since ngOnInit is only called once
         * when going in the same path ie from forum/page2 to forum/page3
         * 
         * careful here: data is an object containing a list of topic
         * and not the actual list of topic so you cannot assign topics
         * to this variable straight away.
         */      
        this.route.data.subscribe((data:any) =>{
            this.topics=this.route.snapshot.data['topics'];
            let pageNumber = this.route.snapshot.params['id'];
            if ( pageNumber == null ) {
                //we are in the main forum page
                this.currentPage = 1;
            }
            else {
                this.currentPage = parseInt( pageNumber );
            }
            this.initData();
        });
    }
    
    increasePage(){
        this.currentPage++;
    }
    
    initData(){
        this.showPrevPage = this.currentPage == 1 ? false : true;
        this.topicCount = this.topics.length;
        this.initTimestamp();//currently read from topic instead of replies;
    }
    
    refreshData(){
        this.dataService.getForumTopics(this.currentPage).subscribe(topics=>{
            this.topics=topics;
            this.initData();
        });
    }
    
    showTopicForm(){
        this.topicBtn.nativeElement.blur();
        this.isCreatingTopic = !this.isCreatingTopic;
    }
        
    createTopic( title: String, topicBody: String ): void {
        
        this.dataService.createNewTopic( title, topicBody)
        .subscribe(
        res => {
            this.isCreatingTopic = false;
            //Topic Creation Succeeded,refresh page data so we see it.
            
            /*If we are currently on main page(1) refresh data, otherwise reroute to main page
            which will load the new data.Rerouting to the same page you are currently viewing
            will not activate anything as per angular.*/
            if ( this.currentPage != 1 ) {
                this.router.navigateByUrl( "/forum" );
            }
            else{
                this.refreshData();
            }
        },
        error => console.log( "ERROR:" + error )
        );
    }
}