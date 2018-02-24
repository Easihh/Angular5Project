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
   
    username: string;
    password: string;
    typedUsername: Subject<string> = new Subject<string>();
    hasError: boolean = true;
    usernameErrorMsg: string="username is required.";
  
    constructor( private dataService: DataService, private router: Router ) { }

    ngOnInit(): void {
        this.dataService.checkUsernameAvailability( this.typedUsername ).subscribe( result => {
            this.hasError = !result.message.includes( "available" );
            console.log("hasError:"+this.hasError);
            console.log("Message:"+result.message);
            this.usernameErrorMsg = result.message;
        } )
    }
  
    registerNewAccount(): void {
        this.dataService.createNewUser( this.username, this.password ).subscribe( data => {
            this.router.navigate( ["/"] );
        } );
    }

}
