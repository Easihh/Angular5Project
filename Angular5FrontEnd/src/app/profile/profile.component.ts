import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Battler } from "../interfaces/battler";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    
  player:Battler; 

  constructor(private dataService:DataService) { }

  ngOnInit() {
      this.dataService.retrievePlayer().subscribe(player=>{
          this.player=player;
      },
          err => console.log( "error retrieving player:" + this.dataService.getPlayer().name + " in profile page." ) )
  }

}
