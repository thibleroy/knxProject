import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent }      from './home/home.component';
import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'connect', component: HomeComponent },
  { path: 'main', component: MainComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
  
})
export class AppRoutingModule {}