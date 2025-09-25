import { Routes } from '@angular/router';
import { Login } from "./core/auth/pages/login/login";
import { Register } from "./core/auth/pages/register/register";
import { Home } from "./features/picture/pages/home/home";

export const routes: Routes = [
  { path: '', component: Home, title: "Accueil | Angular ORM" },
  { path: 'login', component: Login, title: "Connexion | Angular ORM" },
  { path: 'register', component: Register, title: "Inscription | Angular ORM" },
  {
    path: 'picture/:pictureId',
    loadComponent: () => import('./features/picture/pages/picture/picture').then(m => m.Picture),
    title: `Image | Angular ORM`
  },
  {
    path: 'picture/:pictureId/modify',
    loadComponent: () => import('./features/picture/pages/add-picture/add-picture.component').then(m => m.AddPicture),
    title: `Modifier image | Angular ORM`
  },
  {
    path: 'user/:userId', children: [
      // default: profile (add on implementation)
      {
        path: 'picture',
        loadComponent: () => import('./features/picture/pages/user-pictures/user-pictures').then(m => m.UserPictures),
        title: `Gallery | Angular ORM`
      },
      {
        path: 'picture/add',
        loadComponent: () => import('./features/picture/pages/add-picture/add-picture.component').then(m => m.AddPicture),
        title: `Nouvelle image | Angular ORM`
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
