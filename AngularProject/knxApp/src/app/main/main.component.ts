import { Component, OnInit, OnDestroy} from '@angular/core';
import { AppComponent, MqttMessage } from "../app.component";
import { Router } from '@angular/router';
import { MqttService, SubscriptionGrant } from 'ngx-mqtt-client';
import { AuthService } from "../auth-service.service";
import { ConnectedService } from '../connected.service';
export interface Foo {
  bar: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit, OnDestroy {


  makettes: string[] = [];
  maketOrder: any[] = [];
  ipConnected = [];


  ngOnDestroy(): void {

  }
  constructor(private App: AppComponent, private router: Router, private _mqttService: MqttService, private auth: AuthService, private connectedService: ConnectedService) { }

  choseMaquette: boolean = true;
  maquettes = []
  chenillards = [];
  value: string = '50';
  order = [1, 2, 3, 4];
  newOrder = [];

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.subscribe('knx/state')
      this.App.sendMsg('knx/action', 'discover', null, "")
      this.ipConnected = this.connectedService.ipConnected;
      this.maquettes=this.connectedService.maquetteAvailable;
    } else { this.router.navigateByUrl('/') }
  }
  sendMsg(topic, action, value) {
    this.App.sendMsg(topic, action, value, "allConnected")
  }


  sendDiscover(){
    this.App.sendMsg("knx/action","discover",null, "")
  }

  atLeastOne(){
    if (this.maquettes.length>0){
      return true;
    }
    else {return false;}
  }

  choseChenillard(value) {
    //source des maquettes : makettes
    //ordre des maquettes : maketOrder
    if (this.makettes.length > 1) {
      this.makettes.splice(this.makettes.indexOf(value), 1);
      this.maketOrder.push(value)
    }
    else if (this.makettes.length == 1) {
      this.makettes.splice(this.makettes.indexOf(value), 1);
      this.maketOrder.push(value)
      this.choseMaquette = false
    }
    else {
      this.newOrder.push(value)
      this.order.splice(this.order.indexOf(value), 1);
      if (this.order.length == 0) {
        let enFAIT = { maquetteOrder: this.maketOrder, pattern: this.newOrder }
        this.chenillards.push(enFAIT);
        this.order = [1, 2, 3, 4];
        this.newOrder = [];
        this.choseMaquette = true;
        this.makettes = this.ipConnected;
        this.maketOrder = []
      }
    }
  }

  subscribe(topic): void {
    this._mqttService .subscribeTo(topic)
      .subscribe({
        next: (msg: SubscriptionGrant | MqttMessage) => {
          if (msg instanceof SubscriptionGrant) {

          } else {
            if (topic == "knx/state") {
              console.log("main msg mqtt reçu : " + JSON.stringify(msg))
              switch (msg.action) {
                case "discover":
                  console.log("maquette la : " + msg.value)
                  msg.value.forEach(element => {
                    if (this.maquettes.indexOf(element)!= -1){

                    }else{
                      this.maquettes.push(element)
                      this.makettes.push(element)
                    }
                  });
                  this.connectedService.maquetteAvailable = this.maquettes
                  break
                case "connected":
                  console.log('main connected : ' + msg.value.ip)
                  this.connectedService.ipConnected.push(msg.value.ip)
                  this.ipConnected = this.connectedService.ipConnected
                  break
                case "disconnected":
                  console.log('disconnected : ' + msg.value.ip)
                  this.connectedService.ipConnected.splice(this.ipConnected.indexOf(msg.value.ip), 1)
                  this.ipConnected = this.connectedService.ipConnected
              }
            }
          }
        },
        error: (error: Error) => {

        }
      });
  }
}