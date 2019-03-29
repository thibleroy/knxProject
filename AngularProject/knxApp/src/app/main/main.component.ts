import { Component, OnInit, OnDestroy } from '@angular/core';
import * as ons from 'onsenui';
import { AppComponent } from "../app.component";

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

    lamp1 : string ='1';
    lamp2 : string ='2';
    lamp3 : string ='3';
    lamp4 : string ='4';
  value: string = '50';
  clickTurnOn() {
    ons.notification.alert('Clicked!');
  }
  ngOnInit() {
    this.App.subscribe('knx/action')
    this.App.subscribe('knx/state')
  }
  sendMsg(topic,action,value){
    if (value == 'Chenillard') {value=["1","2","3","4"]}
    if (value == 'orderChenillard') {value=[this.lamp1,this.lamp2,this.lamp3,this.lamp4]}
      this.App.sendMsg(topic,action,value)
  }

}