import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { TopicComponent } from './topic/topic.component';
import { AuthGuard} from './auth.guard';
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { TopicReplyComponent } from "./topic-reply/topic-reply.component";
import { BattlerComponent } from "./battler/battler.component";
import { ArenaMatchBattleLogComponent } from "./arena.match.battle.log/arena.match.battle.log.component";
import { TopicReplyResolver } from "./resolvers/topicReply.resolver";
import { ArenaMatchResolver } from "./resolvers/arena.match.resolver";
import { TopicResolver } from "./resolvers/topic.resolver";
import { ArenaMatchBattleLogResolver } from "./resolvers/arena.match.battle.log.resolver";
import { MatchDetailsComponent } from "./match-details/match-details.component";
import { ArenaComponent } from "./arena/arena.component";
import { ProfileComponent } from "./profile/profile.component";

export const router: Routes = [

    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'arena', component: ArenaComponent , runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/topic/:topicId/page/:page', component: TopicReplyComponent, resolve:{replies:TopicReplyResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/topic/:topicId', component: TopicReplyComponent, resolve:{replies:TopicReplyResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/page/:page',component:TopicComponent,resolve:{topics:TopicResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId',component:TopicComponent,resolve:{topics:TopicResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum', component: ForumComponent},
    { path: 'arena/match/:matchId/log/:logId', component: ArenaMatchBattleLogComponent,resolve:{arenaMatchBattleLog:ArenaMatchBattleLogResolver},runGuardsAndResolvers: 'always'},
    { path: 'arena/match/:matchId', component: MatchDetailsComponent,resolve:{arenaMatch:ArenaMatchResolver},runGuardsAndResolvers: 'always'},
    { path: 'battler', component: BattlerComponent, canActivate:[AuthGuard]},
    { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router,{onSameUrlNavigation:'reload'} );


