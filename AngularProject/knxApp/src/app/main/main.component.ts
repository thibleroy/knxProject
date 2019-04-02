import { Component, OnInit, OnDestroy, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
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

export class MainComponent implements OnInit,OnDestroy, OnChanges {

  @Input() data;


  
    ngOnDestroy(): void {
    }

    constructor ( private App : AppComponent){}

    isChecked = false;
    lamp1 : string ='1';
    lamp2 : string ='2';
    lamp3 : string ='3';
    lamp4 : string ='4';
    value: string = '50';
  clickTurnOn() {
    ons.notification.alert('Clicked!');
  }
  ngOnChanges(changes: SimpleChanges){
    const data: SimpleChange = changes.data;
    //console.log('prev value: ', data.previousValue);
    //console.log('got data: ', data.currentValue);
    
    this.isChecked = data.currentValue;
    console.log("from main " + this.isChecked)
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