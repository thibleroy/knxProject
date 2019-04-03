import {Component, Output, EventEmitter, OnDestroy} from '@angular/core';
import { MqttService, ConnectionStatus, SubscriptionGrant } from 'ngx-mqtt-client';
import { IClientOptions } from 'mqtt';
import { stringify } from '@angular/compiler/src/util';

export interface Foo {
    bar: string;
}
interface MqttMessage {
    action:    string;
    value:     string;
  }

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
    messages: Array<Foo> = [];
    lampsCom : Array<number> = [0,0,0,0]
    lamps : Array<number> = [0,0,0,0];
    status: Array<string> = [];
    switchChecked: boolean = false;

  constructor(private _mqttService: MqttService) {

      /**
       * Tracks connection status.
       */
      this._mqttService.status().subscribe((s: ConnectionStatus) => {
          const status = s === ConnectionStatus.CONNECTED ? 'CONNECTED' : 'DISCONNECTED';
          this.status.push(`Mqtt client connection status: ${status}`);
      });
  }


  isChecked (check){
      console.log(check);
      this.switchChecked = check;
  }
  /**
   * Manages connection manually.
   * If there is an active connection this will forcefully disconnect that first.
   * @param {IClientOptions} config
   */
  connect(config: IClientOptions): void {
      this._mqttService.connect(config);
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
                      this.status.push('Subscribed to : '+topic+' !');
                  } else {
                      if (topic == "knx/state"){
                        switch (msg.action){ // {"action" : "l1", "value" : "0"}
                            case "l1" : 
                            if (msg.value=="1"){
                                console.log("l1 allumée")
                                this.lampsCom[0]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[0]=0;
                                    this.lamps=this.lampsCom;
                                    console.log("l1 éteinte")}
                            break
                            case "l2" : 
                            if (msg.value=="1"){
                                console.log("l2 allumée")
                                this.lampsCom[1]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[1]=0;
                                    this.lamps=this.lampsCom;
                                    console.log("l2 éteinte")}
                            break
                            case "l3" : 
                            if (msg.value=="1"){
                                console.log("l3 allumée")
                                this.lampsCom[2]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[2]=0;
                                    this.lamps=this.lampsCom;
                                    console.log("l3 éteinte")}
                            break
                            case "l4" : 
                            if (msg.value=="1"){
                                console.log("l4 allumée")
                                this.lampsCom[3]=1;
                                this.lamps=this.lampsCom;
                                }else {
                                    this.lampsCom[3]=0;
                                    this.lamps=this.lampsCom;
                                    console.log("l4 éteinte")}
                            break
                        }
                      }
                  }
              },
              error: (error: Error) => {
                  this.status.push(`Something went wrong: ${error.message}`);
              }
          });
  }


  /**
   * Sends message to fooBar topic.
   */
  sendMsg(topic,action,extra): void {
      this._mqttService.publishTo("" + topic, {action : action, value: extra, }).subscribe({
          next: () => {
              this.status.push('Message sent to : '+topic);
          },
          error: (error: Error) => {
              this.status.push(`Something went wrong: ${error.message}`);
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
