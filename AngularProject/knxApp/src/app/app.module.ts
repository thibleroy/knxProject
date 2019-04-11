import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main/main.component';
import { MqttService, NgxMqttClientModule } from 'ngx-mqtt-client';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';
import { MaquetteCardComponent } from './maquette-card/maquette-card.component';
import { MaquetteCarouselComponent } from './maquette-carousel/maquette-carousel.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AppComponent,
    MainComponent,
    ToolbarComponent,
    LoginComponent,
    MaquetteCardComponent,
    MaquetteCarouselComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    NgxMqttClientModule.withOptions({
      //broker aws : 3.83.149.37
      //broker local : 192.168.0.108
      host: '3.83.149.37',
      protocol: 'ws',
      port: 9001,
      clientId: 'Duncan'
    })
  ],
  providers: [MqttService],
  bootstrap: [AppComponent]
})
export class AppModule { }