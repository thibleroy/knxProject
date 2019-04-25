import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { MainComponent } from './main/main.component';
import { MaquetteCarouselComponent } from './maquette-carousel/maquette-carousel.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  {path : 'maquette', component: MaquetteCarouselComponent},
  { path: '**',
  redirectTo: 'login',
  pathMatch: 'full'}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
  
})
export class AppRoutingModule {}