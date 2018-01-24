import { Component, OnInit } from '@angular/core';
import { News } from "../news";
import { DataService } from "../data.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'app-news',
  templateUrl: './home.component.html',
  styleUrls: ['../css/bootstrap.css','./home.component.css']
})
export class HomeComponent implements OnInit {
    
  myNews: News[] = [];

  constructor(private dataService:DataService) { }

  ngOnInit() {
      this.dataService.getNews().subscribe(data=>{
          this.myNews=data;
          for ( let i = 0; i < this.myNews.length; i++ ) {
              let createdDate = new Date( this.myNews[i].created )
              let datePipe = new DatePipe( "en-US" );
              this.myNews[i].created = datePipe.transform( createdDate, 'MMM d, yyyy' );
          }
      }),
      error=>{
          console.log( "ERROR:" + error );
      }
  }

}
