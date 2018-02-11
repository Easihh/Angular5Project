import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.router';
import { FormsModule }        from '@angular/forms';
import { JwtModule} from '@auth0/angular-jwt';
import { AuthGuard} from './auth.guard';
import { HttpClientModule  } from '@angular/common/http';
import { DataService } from './data.service';
import { TopicService } from './topic.service';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { DatatableComponent } from './datatable/datatable.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForumComponent } from './forum/forum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicComponent } from './topic/topic.component';
import { HomeComponent } from './home/home.component';
import { TopicResolver } from "./topic.resolver";
import { TopicReplyResolver } from "./topicReply.resolver";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RegisterComponent } from './register/register.component';
import { TopicReplyComponent } from './topic-reply/topic-reply.component';
import { MarkdownModule } from 'ngx-md';
import { WebsocketService } from "./websocket.service";
import { EnemyDetailsComponent } from './enemy-details/enemy-details.component';
import { BattlerComponent } from "./battler/battler.component";

@NgModule({
  declarations: [     
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    DatatableComponent,
    LoginFormComponent,
    ForumComponent,
    TopicComponent,
    HomeComponent,
    RegisterComponent,
    TopicReplyComponent,
    BattlerComponent,
    EnemyDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    JwtModule.forRoot({
        config: {
            tokenGetter:()=>{
                return sessionStorage.getItem('token');
            },
            //whitelistedDomains:['localhost:8090']
        }
    }),
    MarkdownModule.forRoot(),
    NgbModule.forRoot(),
    routes
  ],
  exports: [],
  providers: [DataService,WebsocketService,TopicService,AuthGuard,TopicResolver,TopicReplyResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
