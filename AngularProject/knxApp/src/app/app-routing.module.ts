import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
<<<<<<< Updated upstream
=======
import { MaquetteCardComponent } from "./maquette-card/maquette-card.component";
import { MaquetteCarouselComponent } from "./maquette-carousel/maquette-carousel.component";
>>>>>>> Stashed changes

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'connect', component: HomeComponent },
<<<<<<< Updated upstream
  { path: 'main', component: MainComponent }
=======
  { path: 'main', component: MainComponent },
  {path : 'maquette', component: MaquetteCarouselComponent}
>>>>>>> Stashed changes
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
  
})
export class AppRoutingModule {}