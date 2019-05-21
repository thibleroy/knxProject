import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MqttService, ConnectionStatus, SubscriptionGrant } from 'ngx-mqtt-client';
import { MqttMessage } from "../app.component";
import { ConnectedService } from '../connected.service';
@Component({
  selector: 'app-maquette-card',
  templateUrl: './maquette-card.component.html',
  styleUrls: ['./maquette-card.component.css']
})
export class MaquetteCardComponent implements OnInit {

  @Input() data : string;

  ngOnInit(): void {
    this.subscribe('knx/state/' + this.data)
    this.isConnected()
  }


  ngOnDestroy(): void {
  }
  constructor(private App: AppComponent, private router: Router, private _mqttService: MqttService, private connectedService: ConnectedService) {

  }
  connected : boolean = false;
  lampsCom: Array<number> = [0, 0, 0, 0]
  chenillards = [];
  lamps: Array<number> = [0, 0, 0, 0];
  value: string = '50';
  order = [1, 2, 3, 4];
  newOrder = [];

  isConnected() {
this.connected= (this.connectedService.connectedIp(this.data))
  }

  choseChenillard(value) {

    this.newOrder.push(value)
    this.order.splice(this.order.indexOf(value), 1);
    if (this.order.length == 0) {
      let enFAIT = { value: "" + this.newOrder[0] + ", " + this.newOrder[1] + ", " + this.newOrder[2] + ", " + this.newOrder[3] }
      this.chenillards.push(enFAIT);
      this.order = [1, 2, 3, 4];
      this.newOrder = [];
    }
  }
  sendMsg(topic, action, value) {
    switch (action) {
      case 'on':
        let o = value.split(", ");
        value = [o[0], o[1], o[2], o[3]]
        break
      default: break
    }


    this.App.sendMsg(topic, action, value, this.data)
  }
  subscribe(topic): void {
    this._mqttService.subscribeTo(topic)
      .subscribe({
        next: (msg: SubscriptionGrant | MqttMessage) => {
          if (msg instanceof SubscriptionGrant) {

          } else {
            if (topic == "knx/state/" + this.data) {
              console.log(msg + "componentmaquette")
              switch (msg.action) { // {"action" : "l1", "value" : "0"}
                case "l1":
                  if (msg.value == "1") {
                    this.lampsCom[0] = 1;
                    this.lamps = this.lampsCom;
                  } else {
                    this.lampsCom[0] = 0;
                    this.lamps = this.lampsCom;
                  }
                  break
                case "l2":
                  if (msg.value == "1") {
                    this.lampsCom[1] = 1;
                    this.lamps = this.lampsCom;
                  } else {
                    this.lampsCom[1] = 0;
                    this.lamps = this.lampsCom;
                  }
                  break
                case "l3":
                  if (msg.value == "1") {
                    this.lampsCom[2] = 1;
                    this.lamps = this.lampsCom;
                  } else {
                    this.lampsCom[2] = 0;
                    this.lamps = this.lampsCom;
                  }
                  break
                case "l4":
                  if (msg.value == "1") {

                    this.lampsCom[3] = 1;
                    this.lamps = this.lampsCom;
                  } else {
                    this.lampsCom[3] = 0;
                    this.lamps = this.lampsCom;
                  }
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
