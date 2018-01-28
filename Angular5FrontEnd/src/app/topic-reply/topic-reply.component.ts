import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { TopicService } from "../topic.service";
import { TopicReply } from "../topicReply";
import { TopicReplyWrapper } from "../topicReplyWrapper";
import { DataService } from "../data.service";

@Component({
  selector: 'app-topic-reply',
  templateUrl: './topic-reply.component.html',
  styleUrls: ['../css/bootstrap.css','./topic-reply.component.css']
})
export class TopicReplyComponent implements OnInit {
  
    replies: TopicReply[] = [];
    perPageTopicReplies: number = 5;
    currentPage: number;
    pageholder:number[]=[];
    topicId:number;
    topicTitle:string;
    topicReplyText:string="";
    displayReplyForm: boolean = true;
    forum:number;
    isOnline: boolean = false;
    @ViewChild( 'replyBtn' ) replyBtn;
    @ViewChild( 'addReplyBtn' ) addReplyBtn;
    @ViewChild('replyDiv', { read: ElementRef }) public replyDiv: ElementRef;
  
  constructor(private dataService:DataService,private route: ActivatedRoute, private topicService:TopicService,private router:Router ) { }

  ngOnInit() {
      this.isOnline = this.dataService.loggedIn();
      this.router.events.subscribe((e: any) => {
          // If it is a NavigationEnd event re-initalise the component even on same-path reload.
          if (e instanceof NavigationEnd) {
            this.refreshData();
          }
        });
      /* Have to subscribe here since ngOnInit is only called once
       * when going in the same path ie from forum/forumid/topic/:topicId/page2 to forum/forumid/topic/:topicId/page3
       */      
      this.route.data.subscribe(data => {
          let wrapper: TopicReplyWrapper = data['replies'];
          if ( wrapper == null || wrapper.topicIsLocked) {
              this.displayReplyForm = false;
          }
          if(wrapper == null){
              return;//Server did not return any replies due to an Error
          }
          this.replies = wrapper.topicReplies;
          this.topicTitle = wrapper.topicTitle;
          this.initPagination(wrapper.repliesCount);
      } );
  }
  
  initPagination(totalRepliesCount:number){
      let pageNumber = this.route.snapshot.params['page'];
      this.topicId = this.route.snapshot.params['topicId'];
      this.forum=this.route.snapshot.params['forumId'];
      if ( isNaN(pageNumber)) {
          //we are in the main topic-reply page
          this.currentPage = 1;
      }
      else {
          this.currentPage = parseInt( pageNumber );
      }
      let rem = totalRepliesCount % this.perPageTopicReplies;
      let div = ( totalRepliesCount / this.perPageTopicReplies ) | 0;
      let maxPage = rem == 0 ? div : div + 1;
      this.pageholder = [];
      let minPage = this.currentPage == 1 ? 1 : this.currentPage - 1;
      for ( let i = minPage; i <= maxPage; i++ ) {
          if ( isNaN( pageNumber ) && i==1 ) {
              continue;    
          }
          this.pageholder.push( i );
      }
  }
  
  moveToReplyForm() {
      this.replyBtn.nativeElement.blur();
      this.replyDiv.nativeElement.scrollIntoView();
  }
  
  refreshData() {
      this.topicService.getTopicReplies( this.topicId, this.currentPage ).subscribe( repliesWrapper => {
          if ( repliesWrapper == null || repliesWrapper.topicIsLocked) {
              this.displayReplyForm = false;
          }
          if(repliesWrapper == null){
              return;//Server did not return any replies due to an Error
          }
          this.replies = repliesWrapper.topicReplies;
          this.topicTitle = repliesWrapper.topicTitle;
          this.initPagination(repliesWrapper.repliesCount);
          this.isOnline = this.dataService.loggedIn();
      } );
  }
  
  createTopicReply(): void {
      this.addReplyBtn.nativeElement.blur();
      
      this.topicService.createNewTopicReply( this.topicId, this.topicReplyText)
      .subscribe(
      res => {
          //TopicReply Creation Succeeded,refresh page data so we see it.

          this.refreshData();
          this.topicReplyText = "";
          window.scrollTo( 0, 0 );
      },
      error => console.log( "ERROR:" + error )
      );
  }
}
