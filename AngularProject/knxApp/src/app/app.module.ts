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
import { LoginComponent } from './login/login.component';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    OnsenModule,
    AppRoutingModule,
    NgxMqttClientModule.withOptions({
      host: '192.168.0.108',
      protocol: 'ws',
      port: 9001,
      clientId: 'Duncan'
    })
  ],
  providers: [MqttService],
  bootstrap: [AppComponent]
})
export class AppModule { }