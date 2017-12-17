import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { ForumComponent } from './forum/forum.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { AuthGuard} from './auth.guard';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'about', component: AboutComponent , canActivate:[AuthGuard]},
    { path: 'forum', component: ForumComponent},
    { path: '**', component: NotFoundComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot( router );


