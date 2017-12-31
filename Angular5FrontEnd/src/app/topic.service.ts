import { Injectable } from '@angular/core';
import { Router,Resolve,ActivatedRouteSnapshot } from "@angular/router";
import { DataService } from "./data.service";
import { Observable } from "rxjs/Observable";
import { Topic } from "./topic";
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

@Injectable()
export class TopicService implements Resolve<Topic[]>{

  constructor(private dataService: DataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Observable<Topic[]>{
      let id = +route.params['id'];
      if ( isNaN(id) || id<=1 ) {
          //no id or trying to access forum/page1 which is the forum main page;
          console.log( "The URL doesnt contains a valid id, moving to forum first page." );
          id = 1;
      }
      return this.dataService.getForumTopics(id).map(topics =>{
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
