import { Routes } from '@angular/router';
import { Login } from "./features/login/login";
import { Register } from "./features/register/register";

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/homepage/homepage').then(m => m.Homepage) },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
