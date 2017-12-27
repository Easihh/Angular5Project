import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { TopicComponent } from './topic/topic.component';
import { AuthGuard} from './auth.guard';
import { HomeComponent } from "./home/home.component";

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'about', component: AboutComponent , canActivate:[AuthGuard]},
    { path: 'forum/topic/:id', component: TopicComponent},
    { path: 'forum/page/:id', component: ForumComponent},
    { path: 'forum', component: ForumComponent},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );


