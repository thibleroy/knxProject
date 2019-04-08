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
  
    chenillards = [{value : "1, 2, 3, 4"}];
    lamps : Array<number> = [0,0,0,0];
    isChecked = false;
    value: string = '50';
    order = [1,2,3,4];
    newOrder = [];

  ngOnChanges(changes: SimpleChanges){
    const data: SimpleChange = changes.data;
    //console.log('prev value: ', data.previousValue);
    //console.log('got data: ', data.currentValue);
    this.lamps = data.currentValue;
  }
  ngOnInit() {
    this.App.subscribe('knx/action')
    this.App.subscribe('knx/state')
  }
  sendMsg(topic,action,value){
    if (value != null && value.includes(', ')){
      let o = value.split(", ");
      value=[o[0],o[1],o[2],o[3]]}
      
      this.App.sendMsg(topic,action,value)
  }

  choseChenillard(value){
    
    this.newOrder.push(value)
    this.order.splice(this.order.indexOf(value),1);
    if (this.order.length==0){
      let enFAIT = {value : ""+this.newOrder[0]+", "+this.newOrder[1]+", "+this.newOrder[2]+", "+ this.newOrder[3]}
      this.chenillards.push(enFAIT);
      this.order = [1,2,3,4];
      this.newOrder =[];
    }
  }
}