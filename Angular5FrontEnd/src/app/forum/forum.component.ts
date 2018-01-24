import { Component, OnInit,ViewChild } from '@angular/core';
import { Topic } from "../topic";
import { ActivatedRoute, Router } from "@angular/router";
import { TopicService } from "../topic.service";
import { DatePipe } from "@angular/common";
import { Forum } from "../forum";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['../css/bootstrap.css','./forum-component.css']
})
export class ForumComponent{
    
    forumList:Forum[]=[];

    constructor(){
        this.forumList.push(new Forum(7777,"General","Discuss bla bla bla strategies in this forum."));
        this.forumList.push(new Forum(9999,"Off-Topic","Almost anything goes in this forum."));
    }
 
}