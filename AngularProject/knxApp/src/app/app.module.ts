import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MqttService, NgxMqttClientModule } from 'ngx-mqtt-client';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    NgxMqttClientModule.withOptions({
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