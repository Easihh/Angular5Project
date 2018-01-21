import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router} from '@angular/router';
import { DataService} from '../data.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../css/bootstrap.css']
})
export class LoginFormComponent implements OnInit {

    @Output( 'loggedIn' ) loggedIn = new EventEmitter<any>();

    constructor( private router: Router, private service: DataService ) { }
  
    ngOnInit() {}
  
  onSubmit( event: Event ): void {
      //should not be required anymore with ngSubmit with Form module imported
      //event.preventDefault();
      var username = event.target[0].value;
      var password = event.target[1].value;
      this.service.tryLogin( username, password )
          .subscribe(
          res => {
              console.log("about to save token")
              console.log( res.data );
              localStorage.setItem( "token", res.data );
              this.loggedIn.emit({
                  username:username             
              });
          },
          error => console.log( "ERROR LOGIN:" + error )
          );
  }  

}
