import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { TopicComponent } from './topic/topic.component';
import { AuthGuard} from './auth.guard';
import { HomeComponent } from "./home/home.component";
import { TopicResolver } from "./topic.resolver";
import { Topic } from "./topic";
import { TopicReplyResolver } from "./topicReply.resolver";
import { RegisterComponent } from "./register/register.component";
import { TopicReplyComponent } from "./topic-reply/topic-reply.component";
import { EnemyDetailsComponent } from "./enemy-details/enemy-details.component";
import { BattlerComponent } from "./battler/battler.component";
import { ArenaMatchResolver } from "./arena.match.resolver";

export const router: Routes = [

    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'about', component: AboutComponent , runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/topic/:topicId/page/:page', component: TopicReplyComponent, resolve:{replies:TopicReplyResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/topic/:topicId', component: TopicReplyComponent, resolve:{replies:TopicReplyResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/page/:page',component:TopicComponent,resolve:{topics:TopicResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId',component:TopicComponent,resolve:{topics:TopicResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum', component: ForumComponent},
    { path: 'enemy/:matchId', component: EnemyDetailsComponent,resolve:{arenaMatch:ArenaMatchResolver},runGuardsAndResolvers: 'always'},
    { path: 'battler', component: BattlerComponent},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router,{onSameUrlNavigation:'reload'} );


