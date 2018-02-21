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
import { NotFoundComponent } from './notfound/notfound.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ForumComponent } from './forum/forum.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopicComponent } from './topic/topic.component';
import { HomeComponent } from './home/home.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RegisterComponent } from './register/register.component';
import { TopicReplyComponent } from './topic-reply/topic-reply.component';
import { MarkdownModule } from 'ngx-md';
import { WebsocketService } from "./websocket.service";
import { BattlerComponent } from "./battler/battler.component";
import { ArenaMatchBattleLogComponent } from './arena.match.battle.log/arena.match.battle.log.component';
import { MatchDetailsComponent } from "./match-details/match-details.component";
import { TopicResolver } from "./resolvers/topic.resolver";
import { TopicReplyResolver } from "./resolvers/topicReply.resolver";
import { ArenaMatchResolver } from "./resolvers/arena.match.resolver";
import { ArenaMatchBattleLogResolver } from "./resolvers/arena.match.battle.log.resolver";
import { ArenaComponent } from "./arena/arena.component";
import { ArenaService } from "./arena.service";
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [     
    AppComponent,
    ArenaComponent,
    NotFoundComponent,
    LoginFormComponent,
    ForumComponent,
    TopicComponent,
    HomeComponent,
    RegisterComponent,
    TopicReplyComponent,
    BattlerComponent,
    MatchDetailsComponent,
    ArenaMatchBattleLogComponent,
    ProfileComponent
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
  providers: [DataService,ArenaService,WebsocketService,TopicService,AuthGuard,TopicResolver,TopicReplyResolver,ArenaMatchResolver,ArenaMatchBattleLogResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
