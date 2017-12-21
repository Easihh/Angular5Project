import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { FormsModule }        from '@angular/forms';
import { JwtModule} from '@auth0/angular-jwt';
import { AuthGuard} from './auth.guard';
import { HttpClientModule  } from '@angular/common/http';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { DatatableComponent } from './datatable/datatable.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForumComponent } from './forum/forum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicComponent } from './topic/topic.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [     
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    DatatableComponent,
    LoginFormComponent,
    ForumComponent,
    TopicComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
        config: {
            tokenGetter:()=>{
                return localStorage.getItem('token');
            },
            //whitelistedDomains:['localhost:8090']
        }
    }),
    NgbModule.forRoot(),
    routes
  ],
  exports: [],
  providers: [DataService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
