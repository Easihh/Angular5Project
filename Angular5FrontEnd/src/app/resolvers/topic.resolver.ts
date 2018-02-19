import { Injectable } from '@angular/core';
import { Router,Resolve,ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import { Topic } from "../interfaces/topic";
import { TopicService } from "../topic.service";

@Injectable()
export class TopicResolver implements Resolve<Topic[]>{

  constructor(private topicService: TopicService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Observable<Topic[]>{
      let page = +route.params['page'];
      let forumId = route.params['forumId'];
      if ( isNaN(page) || page<=1) {
          //no id or trying to access forum/:forumid/page1 which is the forum main page;
          console.log( "The URL doesnt contains a valid id, moving to forum first page." );
          page = 1;
      }
      return this.topicService.getForumTopics(page,forumId).map(topics =>{
           return topics;
       })
       .catch(error =>{
           //Usually when Server is down/error response from server.
           let errMessage=(error.message)? error.message: error.status? error.status+"-"+error.statusText:"Server Error";
           console.log( "Topics retrieval error:" + errMessage );
           return Observable.of(null);
       }).first();
  }
}
