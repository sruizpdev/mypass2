import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EditComponent } from './pages/edit/edit.component';
import { NewComponent } from './pages/new/new.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  // { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  // { path: 'new', component: NewComponent, canActivate: [authGuard] },
  { path: 'new', component: NewComponent },
  // { path: 'edit', component: EditComponent, canActivate: [authGuard] },
  { path: 'edit', component: EditComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];
