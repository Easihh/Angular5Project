import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TopicService } from "../topic.service";
import { DatePipe } from "@angular/common";
import { RoleEnum } from "../role-enum";
import { Topic } from "../interfaces/topic";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['../css/bootstrap.css','./topic-component.css']
})
export class TopicComponent  implements OnInit{
    
    perPageTopic: number = 5;
    showNextPage: boolean = true;
    currentPage: number;
    currentForum:number;
    topics: Topic[] = [];
    showPrevPage: boolean;
    isCreatingTopic: boolean = false;
    @ViewChild( 'topicBtn' ) topicBtn;
    

    constructor( private route: ActivatedRoute, private topicService: TopicService, private router:Router ) {
    }
    
    private initTimestamp() {
        for ( let i = 0; i < this.topics.length; i++ ) {
            let lastReplyDate = new Date( this.topics[i].lastUpdated )
            let date = new Date();
            let currentTime = date.valueOf() / 1000 | 0;
            let lastReplyTime = lastReplyDate.valueOf() /1000 |0;
            let timeDifferenceInSeconds = currentTime - lastReplyTime;
            if ( timeDifferenceInSeconds < 60 ) {
                this.topics[i].lastUpdated = timeDifferenceInSeconds + "s";
            }
            else if ( timeDifferenceInSeconds < 3600 ) {
                this.topics[i].lastUpdated = ( timeDifferenceInSeconds / 60 | 0 ) + "m";
            }
            else if ( timeDifferenceInSeconds < 3600 * 24 ) {
                this.topics[i].lastUpdated = ( timeDifferenceInSeconds / 3600 | 0 ) + "h";
            }
            else {
                let datePipe = new DatePipe( "en-US" );
                this.topics[i].lastUpdated = datePipe.transform( lastReplyDate, 'MMM d, yyyy' );
            }
        }
    }  
    ngOnInit(): void {
        /* Have to subscribe here since ngOnInit is only called once
         * when going in the same path ie from forum/page2 to forum/page3
         * 
         *this part is called after the resolve guard with the data required */
        
        this.route.data.subscribe((data:any) =>{
            this.refreshData(data);
        });
    }
    
    initData(){
        this.showPrevPage = this.currentPage == 1 ? false : true;
        this.initTimestamp();
    }
    
    refreshData( data: any ) {
        this.topics = this.route.snapshot.data['topics'];
        this.currentForum = this.route.snapshot.params['forumId'];
        if ( this.topics.length == 0 ) {
            this.router.navigateByUrl( "/error" );
        }
        let pageNumber = this.route.snapshot.params['page'];
        if ( pageNumber == null ) {
            //we are in the main forum page
            this.currentPage = 1;
        }
        else {
            this.currentPage = parseInt( pageNumber );
        }
        this.initData();
    }
    
    showTopicForm(){
        this.topicBtn.nativeElement.blur();
        this.isCreatingTopic = !this.isCreatingTopic;
    }
        
    createTopic( title: String, topicBody: String ): void {
        
        this.topicService.createNewTopic( title, topicBody,this.currentForum)
        .subscribe(
        res => {
            this.isCreatingTopic = false;
            //Topic Creation Succeeded,refresh to main forum page data so we see it.
                     
             this.router.navigateByUrl( "/forum/"+this.currentForum );
        },
        error => console.log( "ERROR:" + error )
        );
    }
    
    isAdmin( roleId: number ) {
        return roleId == RoleEnum.ADMIN;
    }
}