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
  //TODO: Update following path to work with children:
  // Profile: /user/:userId
  // Gallery: /user/:userId/picture
  // Editor - Create picture: /user/:userId/picture/editor
  // Editor - Update picture : /user/:userId/picture/editor/:pictureId
  {
    path: 'user/:userId', children: [
      // default: profile (add on implementation)
      {
        path: 'picture',
        loadComponent: () => import('./features/picture/pages/user-pictures/user-pictures').then(m => m.UserPictures),
        title: `Gallery | Angular ORM`
      },
      {
        path: 'picture/editor/:pictureId',
        loadComponent: () => import('./features/picture/pages/editor/editor').then(m => m.Editor),
        title: `Modifier image | Angular ORM`
      },
      {
        path: 'picture/editor',
        loadComponent: () => import('./features/picture/pages/editor/editor').then(m => m.Editor),
        title: `Nouvelle image | Angular ORM`
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
