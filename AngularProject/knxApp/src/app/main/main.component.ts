import { Component, OnInit, OnDestroy, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import * as ons from 'onsenui';
import { AppComponent, MqttMessage } from "../app.component";
import {MaquetteCardComponent} from "../maquette-card/maquette-card.component";
import { Action } from 'rxjs/internal/scheduler/Action';
import { Router } from '@angular/router';
import { MqttService, SubscriptionGrant } from 'ngx-mqtt-client';
import { AuthService } from "../auth-service.service";
export interface Foo {
    bar: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit,OnDestroy {


  makettes: string[] = ['0.5','0.6']
  maketOrder: any[] = [];


  
    ngOnDestroy(): void {
     
    }
    constructor ( private App : AppComponent, private router : Router,  private _mqttService: MqttService, private auth : AuthService){}
  
    choseMaquette : boolean = true;
    maquettes = ["0.5","0.6"]
    chenillards = [];
    value: string = '50';
    order = [1,2,3,4];
    newOrder = [];

  ngOnInit() {
    if (this.auth.isLogged()){
    this.chenillards.push({maquetteOrder : this.maquettes, pattern : [1,2,3,4]})
    this.subscribe('knx/state')
    this.App.sendMsg('knx/action','discover',null,"")
    }else {this.router.navigateByUrl('/')}
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
      let enFAIT = {maquetteOrder : this.maketOrder, pattern : this.newOrder}
      this.chenillards.push(enFAIT);
      this.order = [1,2,3,4];
      this.newOrder =[];
      this.choseMaquette=true;
      this.makettes = ["0.5","0.6"]
      this.maketOrder=[]
    }
  }
}

subscribe(topic): void {
  this._mqttService.subscribeTo(topic)
      .subscribe({
          next: (msg: SubscriptionGrant | MqttMessage) => {
              if (msg instanceof SubscriptionGrant) {
                 
              } else {
                  if (topic == "knx/state"){
                    switch(msg.action){
                    case "discover" :
                        console.log("maquette co : " +msg.value)
                        msg.value.forEach(element => {
                          this.maquettes.push(element)
                        });
                        break
                    }
                  }
              }
          },
          error: (error: Error) => {
              
          }
      });
}
}