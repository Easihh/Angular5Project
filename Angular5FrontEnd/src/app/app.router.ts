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

export const router: Routes = [

    { path: '', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'about', component: AboutComponent , canActivate:[AuthGuard], runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/topic/:topicId/page/:page', component: TopicReplyComponent, resolve:{replies:TopicReplyResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/topic/:topicId', component: TopicReplyComponent, resolve:{replies:TopicReplyResolver},runGuardsAndResolvers: 'always'},
    { path: 'forum/:forumId/page/:page',component:TopicComponent,resolve:{topics:TopicResolver}},
    { path: 'forum/:forumId',component:TopicComponent,resolve:{topics:TopicResolver}},
    { path: 'forum', component: ForumComponent},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router,{onSameUrlNavigation:'reload'} );


