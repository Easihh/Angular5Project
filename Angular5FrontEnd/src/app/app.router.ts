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

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'about', component: AboutComponent , canActivate:[AuthGuard]},
    { path: 'forum/topic/:topicId/page/:page', component: TopicComponent, resolve:{replies:TopicReplyResolver}},
    { path: 'forum/topic/:topicId', component: TopicComponent, resolve:{replies:TopicReplyResolver}},
    { path: 'forum/page/:id', component: ForumComponent , resolve:{topics:TopicResolver}},
    { path: 'forum', component: ForumComponent , resolve:{topics:TopicResolver}},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );


