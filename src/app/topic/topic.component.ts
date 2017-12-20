import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Reply } from "../reply";

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['../css/bootstrap.css','./topic-component.css']
})
export class TopicComponent implements OnInit {
  
    @Input( 'topicTitle' ) topicTitle;
    topicIdentifier: string;
    replies: Reply[] = [];
  
  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
      this.topicIdentifier = this.route.snapshot.paramMap.get('id');
      console.log("Topic Identifier:"+this.topicIdentifier);
      this.initData();
  }
  
  initData(): void{
      let data = new Reply( 999, "Myself","Some Comments Here", "4m" );
      this.replies.push( data );
  }
  

}
