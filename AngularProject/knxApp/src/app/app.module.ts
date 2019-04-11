import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MqttService, NgxMqttClientModule } from 'ngx-mqtt-client';
import { ToolbarComponent } from './toolbar/toolbar.component';
<<<<<<< Updated upstream
=======
import { LoginComponent } from './login/login.component';
import { MaquetteCardComponent } from './maquette-card/maquette-card.component';
import { MaquetteCarouselComponent } from './maquette-carousel/maquette-carousel.component';
>>>>>>> Stashed changes

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
<<<<<<< Updated upstream
    ToolbarComponent
=======
    ToolbarComponent,
    LoginComponent,
    MaquetteCardComponent,
    MaquetteCarouselComponent
>>>>>>> Stashed changes
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    NgxMqttClientModule.withOptions({
<<<<<<< Updated upstream
=======
      //broker aws : 3.83.149.37
      //mon broker : localhost / prendre l'ip de l'ordi sur le réseau
      //broker local : 192.168.0.108
>>>>>>> Stashed changes
      host: '3.83.149.37',
      protocol: 'ws',
      port: 9001,
      clientId: 'Duncan'
    })
  ],
  entryComponents: [MainComponent, MaquetteCarouselComponent],
  providers: [MqttService],
  bootstrap: [AppComponent]
})
export class AppModule { }