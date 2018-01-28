import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { DataService} from '../data.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../css/bootstrap.css']
})
export class LoginFormComponent implements OnInit {

    @Output( 'loggedIn' ) loggedIn = new EventEmitter<any>();
    currentUrl:string;
    constructor(private router: Router, private service: DataService ) { }
    
    ngOnInit() {        
        this.router.events.subscribe(( ev: any ) => {
            if ( ev instanceof NavigationEnd ) {
                this.currentUrl = ev.url;
            }
        } );
    }

  onSubmit( event: Event ): void {
      //should not be required anymore with ngSubmit with Form module imported
      //event.preventDefault();
      var username = event.target[0].value;
      var password = event.target[1].value;
      this.service.tryLogin( username, password )
          .subscribe(
          res => {
              localStorage.setItem( "token", res.data );
              this.loggedIn.emit({
                  username:username             
              });
              console.log("navigating to:"+this.currentUrl);
              this.router.navigateByUrl(this.currentUrl);
          },
          error => console.log( "ERROR LOGIN:" + error )
          );
  }  

}
