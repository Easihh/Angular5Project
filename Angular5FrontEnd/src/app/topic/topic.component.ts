import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DataService } from "../data.service";
import { TopicReply } from "../topicReply";
import { TopicReplyWrapper } from "../topicReplyWrapper";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['../css/bootstrap.css','./topic-component.css']
})
export class TopicComponent implements OnInit {
  
    replies: TopicReply[] = [];
    perPageTopicReplies: number = 5;
    currentPage: number;
    pageholder:number[]=[];
    topicId:number;
    topicTitle:string;
    topicReplyText:string="";
    displayReplyForm: boolean = true;
    @ViewChild( 'replyBtn' ) replyBtn;
    @ViewChild( 'addReplyBtn' ) addReplyBtn;
    @ViewChild('replyDiv', { read: ElementRef }) public replyDiv: ElementRef;
  
  constructor(private route: ActivatedRoute, private dataService:DataService,private router:Router ) { }

  ngOnInit() {
      /* Have to subscribe here since ngOnInit is only called once
       * when going in the same path ie from forum/topic/:topicId/page2 to forum/topic/:topicId/page3
       */      
      this.route.data.subscribe(data => {
          let wrapper: TopicReplyWrapper = data['replies'];
          if ( wrapper == null ) {
              this.displayReplyForm = false;
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
      this.dataService.getTopicReplies( this.topicId, this.currentPage ).subscribe( repliesWrapper => {
          this.replies = repliesWrapper.topicReplies;
          this.topicTitle = repliesWrapper.topicTitle;
          this.initPagination(repliesWrapper.repliesCount);
      } );
  }
  
  createTopicReply(): void {
      this.addReplyBtn.nativeElement.blur();
      
      this.dataService.createNewTopicReply( this.topicId, this.topicReplyText)
      .subscribe(
      res => {
          //TopicReply Creation Succeeded,refresh page data so we see it.
          
          /*If we are currently on main page(1) refresh data, otherwise reroute to main page
          which will load the new data.Rerouting to the same page you are currently viewing
          will not activate anything as per angular.*/
          if ( this.currentPage != 1 ) {
              this.router.navigateByUrl( "/forum/topic/"+this.topicId);
          }
          else{
              this.refreshData();
              this.topicReplyText = "";
              window.scrollTo( 0, 0 );
          }
      },
      error => console.log( "ERROR:" + error )
      );
  }
}
