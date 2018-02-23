import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
/*import { Directive, forwardRef, 
    Attribute,OnChanges, SimpleChanges,Input } from '@angular/core';
import { NG_VALIDATORS,Validator,
    Validators,AbstractControl,ValidatorFn } from '@angular/forms';*/

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
   
  username:string;
  password:string;
  typedUsername: Subject<string> = new Subject<string>();
  
  constructor(private dataService:DataService,private router:Router) { }
  
  ngOnInit(): void {
     this.dataService.checkUsernameAvailability( this.typedUsername).subscribe(result=>{
         console.log("received from server:"+result);
         let hasError=result.message.includes("taken");
         console.log("has error:"+hasError);
     })
  }
  
  registerNewAccount():void{
      this.dataService.createNewUser(this.username, this.password).subscribe(data=>{
          this.router.navigate(["/"]);
      });
  }

}
