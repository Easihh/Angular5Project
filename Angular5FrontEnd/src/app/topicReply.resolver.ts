import { Injectable } from '@angular/core';
import { Router,Resolve,ActivatedRouteSnapshot } from "@angular/router";
import { TopicService } from "./topic.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import { TopicReplyWrapper } from "./topicReplyWrapper";

@Injectable()
export class TopicReplyResolver implements Resolve<TopicReplyWrapper>{

  constructor(private topicService: TopicService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Observable<TopicReplyWrapper>{
      let page = +route.params['page'];
      let topicId=+route.params['topicId'];
      if ( isNaN(page)) {
          //we are on the first page of topic replies forum/topic/:id
          page=1;
      }
      if(isNaN(topicId)){
          //topicId is invalid, don't get replies from Database.
          console.log("invalid topicId canceling search.");
          return Observable.of(null);
      }
      return this.topicService.getTopicReplies(topicId, page).map(replies =>{
           return replies;
       })
       .catch(error =>{
           //Usually when Server is down/error response from server.
           let errMessage=(error.message)? error.message: error.status? error.status+"-"+error.statusText:"Server Error";
           console.log( "Topic Replies retrieval error:" + errMessage );
           return Observable.of(null);
       }).first();
  }
}
