import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent }      from './home/home.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { MaquetteCardComponent } from "./maquette-card/maquette-card.component";
import { MaquetteCarouselComponent } from './maquette-carousel/maquette-carousel.component';

const routes: Routes = [
  { path : 'test', component: AppComponent},
  { path: '', component: LoginComponent },
  { path: 'connect', component: HomeComponent },
  { path: 'main', component: MainComponent },
  {path : 'maquette', component: MaquetteCarouselComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
  
})
export class AppRoutingModule {}