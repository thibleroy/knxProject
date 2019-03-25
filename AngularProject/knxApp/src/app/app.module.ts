import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgxMqttClientModule} from 'ngx-mqtt-client';
import { AppComponent } from './app.component';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';

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
      port: 9001
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
