import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
  
  constructor(private route: ActivatedRoute, private dataService:DataService ) { }

  ngOnInit() {
      /* Have to subscribe here since ngOnInit is only called once
       * when going in the same path ie from forum/topic/:topicId/page2 to forum/topic/:topicId/page3
       */      
      this.route.data.subscribe(data => {
          let wrapper: TopicReplyWrapper = data['replies'];
          this.replies = wrapper.topicReplies;
          let pageNumber = this.route.snapshot.params['page'];
          this.topicId = this.route.snapshot.params['topicId'];
          this.topicTitle=wrapper.topicTitle;
          console.log("TopicId:"+this.topicId);
          if ( isNaN(pageNumber)) {
              //we are in the main topic-reply page
              this.currentPage = 1;
          }
          else {
              this.currentPage = parseInt( pageNumber );
          }
          let rem = wrapper.repliesCount % this.perPageTopicReplies;
          let div = ( wrapper.repliesCount / this.perPageTopicReplies ) | 0;
          let maxPage = rem == 0 ? div : div + 1;
          this.pageholder = [];
          let minPage = this.currentPage == 1 ? 1 : this.currentPage - 1;
          for ( let i = minPage; i <= maxPage; i++ ) {
              if ( isNaN( pageNumber ) && i==1 ) {
                  continue;    
              }
              this.pageholder.push( i );
          }
      } );
  }
}
