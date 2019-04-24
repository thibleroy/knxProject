import {Component, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import { MqttService, ConnectionStatus, SubscriptionGrant } from 'ngx-mqtt-client';
import { Router } from '@angular/router';
import { AuthService } from "./auth-service.service";

export interface Foo {
    bar: string;
}
export interface MqttMessage {
    action:    string;
    value:     any;
  }

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit{
    ngOnInit(): void {
        if(this.auth.isLogged()){
        this.auth.reconnect();}
    this.subscribe('knx/action')
    this.subscribe('knx/state')
    }
    messages: Array<Foo> = [];
    lampsCom : Array<number> = [0,0,0,0]
    lamps : Array<number> = [0,0,0,0];
    status = [];

  constructor(private _mqttService: MqttService, private router : Router, private auth : AuthService) {

  }

  /**
   * Subscribes to fooBar topic.
   * The first emitted value will be a {@see SubscriptionGrant} to confirm your subscription was successful.
   * After that the subscription will only emit new value if someone publishes into the fooBar topic.
   * */
  subscribe(topic): void {
      this._mqttService.subscribeTo(topic)
          .subscribe({
              next: (msg: SubscriptionGrant | MqttMessage) => {
                  if (msg instanceof SubscriptionGrant) {
                      console.log("subscribed to : "+topic)
                  } else {
                      if (topic == "knx/state"){
                        switch (msg.action){ // {"action" : "l1", "value" : "0"}
                            case "l1" : 
                            if (msg.value=="1"){
                                this.lampsCom[0]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[0]=0;
                                    this.lamps=this.lampsCom;
                                }
                            break
                            case "l2" : 
                            if (msg.value=="1"){
                                this.lampsCom[1]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[1]=0;
                                    this.lamps=this.lampsCom;
                                }
                            break
                            case "l3" : 
                            if (msg.value=="1"){
                                this.lampsCom[2]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[2]=0;
                                    this.lamps=this.lampsCom;
                                }
                            break
                            case "l4" : 
                            if (msg.value=="1"){

                                this.lampsCom[3]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[3]=0;
                                    this.lamps=this.lampsCom;
                                }
                            break
                        }
                      }
                  }
              },
              error: (error: Error) => {
                  console.log(`Something went wrong: ${error.message}`);
              }
          });
  }


  /**
   * Sends message to fooBar topic.
   */
  sendMsg(topic,action,extra, ip): void {
      this._mqttService.publishTo("" + topic+"/"+ip, {action : action, value: extra, }).subscribe({
          next: () => {
              console.log('Message sent to : '+topic+"/"+ip);
          },
          error: (error: Error) => {
              console.log(`Something went wrong: ${error.message}`);
          }
      });
  }

  /**
   * Unsubscribe from fooBar topic.
   */
 /* unsubscribe(topic): void {
      this._mqttService.unsubscribeFrom(topic).subscribe({
          next: () => {
              this.status.push('Unsubscribe from : '+topic);
          },
          error: (error: Error) => {
              this.status.push(`Something went wrong: ${error.message}`);
          }
      });
  }*/

  /**
   * The purpose of this is, when the user leave the app we should cleanup our subscriptions
   * and close the connection with the broker
   */
  ngOnDestroy(): void {
      this._mqttService.end();
  }
}
