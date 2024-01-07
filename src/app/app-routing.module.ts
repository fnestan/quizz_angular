import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'jouer/:gameId',
    loadComponent: () => import('./game/pages/game-page/game-page.component').then(component => component.GamePageComponent)
  },
  {
    path: 'compte-a-rebours',
    loadComponent: () => import('./game/pages/countdown-page/countdown-page.component').then(component => component.CountdownPageComponent)
  },
  {
    path: 'connexion',
    loadComponent: () => import('./login/pages/login-page/login-page.component').then(component => component.LoginPageComponent)
  },
  {
    path: 'creation-partie',
    loadComponent: () => import('./game/pages/create-game-page/create-game-page.component').then(component => component.CreateGamePageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
