import { Component, OnInit, OnDestroy } from '@angular/core';
import * as ons from 'onsenui';
import { AppComponent } from "../app.component";
import {ConnectionStatus, MqttService, SubscriptionGrant} from 'ngx-mqtt-client';
import {IClientOptions} from 'mqtt';

export interface Foo {
    bar: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit,OnDestroy {
    ngOnDestroy(): void {
        throw new Error("Method not implemented.");
    }

    constructor ( private App : AppComponent){}
  value: string = '50';
  clickTurnOn() {
    ons.notification.alert('Clicked!');
  }
  ngOnInit() {
    this.App.subscribe('knx/action')
    this.App.subscribe('knx/state')
  }
  sendMsg(topic,action,value){
      this.App.sendMsg(topic,action,value)
  }

}