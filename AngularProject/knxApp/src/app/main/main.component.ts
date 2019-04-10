import { Component, OnInit, OnDestroy, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import * as ons from 'onsenui';
import { AppComponent } from "../app.component";
import {MaquetteCardComponent} from "../maquette-card/maquette-card.component";
import { Action } from 'rxjs/internal/scheduler/Action';
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
  makettes: string[] = ['0.5','0.6']
  maketOrder: any[] = [];


  
    ngOnDestroy(): void {
     
    }
    constructor ( private App : AppComponent){}
  
    choseMaquette : boolean = true;
    maquettes = ["0.5","0.6"]
    chenillards = [];
    lamps : Array<number> = [0,0,0,0];
    isChecked = false;
    value: string = '50';
    order = [1,2,3,4];
    newOrder = [];
    main=false;

  ngOnChanges(changes: SimpleChanges){
    const data: SimpleChange = changes.data;
    //console.log('prev value: ', data.previousValue);
    //console.log('got data: ', data.currentValue);
    this.lamps = data.currentValue;
  }
  ngOnInit() {
    this.chenillards.push({maquetteOrder : this.maquettes, chenillardOrder : [1,2,3,4]})
  }
  sendMsg(topic,action,value){
    switch(action){
      case 'on' :
      break
      default : break
    }
    
      
      this.App.sendMsg(topic,action,value,"allConnected")
  }

  choseChenillard(value){
    //source des maquettes : makettes
   //ordre des maquettes : maketOrder
    if (this.makettes.length > 1){
    this.makettes.splice(this.makettes.indexOf(value),1);
    this.maketOrder.push(value)
    }
    else if (this.makettes.length == 1){
    this.makettes.splice(this.makettes.indexOf(value),1);
    this.maketOrder.push(value)
    this.choseMaquette=false
    }
    else {
    this.newOrder.push(value)
    this.order.splice(this.order.indexOf(value),1);
    if (this.order.length==0){
      let enFAIT = {maquetteOrder : this.maketOrder, chenillardOrder : this.newOrder}
      this.chenillards.push(enFAIT);
      this.order = [1,2,3,4];
      this.newOrder =[];
      this.choseMaquette=true;
      this.makettes = ["0.5","0.6"]
      this.maketOrder=[]
    }
  }
}
}