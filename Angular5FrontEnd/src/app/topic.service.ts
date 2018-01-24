import { Injectable } from '@angular/core';
import { Topic } from "./topic";
import { TopicReply } from "./topicReply";
import { TopicReplyWrapper } from "./topicReplyWrapper";
import { Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TopicService {
    getTopicURL: string ="/ProjectREST/forum";
    getTopicRepliesURL: string ="/ProjectREST/forum/topic";
    createTopicURL: string ="/ProjectREST/auth/forum/topic/create";
    createTopicReplyURL: string ="/ProjectREST/auth/forum/topic/reply/create";

  constructor(private _http: HttpClient) { }
  
  private handleError( error: any ) {
      if ( error instanceof Response ) {//Backend Error
          //.json() parsing failed from server
          console.log( "Error:"+error.text() );
          return Observable.throw( error.text() );
      }
      //otherwise the server returned error code status
      console.log("Hello There");
      return Observable.throw( error );
  }
      
  getForumTopics( pageNumber: number,forumId:number ): Observable<Topic[]> {
      let params = new HttpParams();
      params = params.append( "pageNumber", pageNumber.toString() );
      params = params.append( "forumId", forumId.toString() );
      return this._http
          .get( this.getTopicURL, { params: params } )
          //.do( data => console.log( "Success:" + data ) )//on success
          .catch( this.handleError );
  }
  
  getTopicReplies(topicId:number, pageNumber: number ): Observable<TopicReplyWrapper> {
      let params = new HttpParams();
      params = params.append( "pageNumber", pageNumber.toString() );
      params = params.append( "topicId", topicId.toString() );
      return this._http
          .get( this.getTopicRepliesURL, { params: params } )
          //.do( data => console.log( "Success:" + data ) )//on success
          .catch( this.handleError );
  }
   
   
   createNewTopic( title: String, body: String,forumId:number ): Observable<any> {
       return this._http.put( this.createTopicURL, { title: title, body: body,forumId:forumId } )
       .do( data => console.log( "Topic:" + data ) )//data return in
       .catch( this.handleError );
   }
   
   createNewTopicReply( topicId: number, body: String ): Observable<any> {
       return this._http.put( this.createTopicReplyURL, { topicId: topicId, body: body } )
       .do( data => console.log( "TopicReply:" + data ) )//data return in
       .catch( this.handleError );
   }
}
