import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    
  username:string
  password:string
  
  constructor(private dataService:DataService,private router:Router) { }
  
  registerNewAccount():void{
      this.dataService.createNewUser(this.username, this.password).subscribe(data=>{
          this.router.navigate(["/home"]);
      });
  }
}
