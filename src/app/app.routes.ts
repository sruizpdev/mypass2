import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EditComponent } from './pages/edit/edit.component';
import { NewComponent } from './pages/new/new.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new', component: NewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit', component: EditComponent },
  { path: '**', redirectTo: 'home' },
];
