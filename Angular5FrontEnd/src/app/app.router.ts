import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { TopicComponent } from './topic/topic.component';
import { AuthGuard} from './auth.guard';
import { HomeComponent } from "./home/home.component";
import { TopicService } from "./topic.service";
import { Topic } from "./topic";
import { TopicReplyResolver } from "./topicReply.resolver";

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent , canActivate:[AuthGuard]},
    { path: 'forum/topic/:topicId/page/:page', component: TopicComponent, resolve:{replies:TopicReplyResolver}},
    { path: 'forum/topic/:topicId', component: TopicComponent, resolve:{replies:TopicReplyResolver}},
    { path: 'forum/page/:id', component: ForumComponent , resolve:{topics:TopicService}},
    { path: 'forum', component: ForumComponent , resolve:{topics:TopicService}},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );


