import { Injectable } from '@angular/core';
import { MqttService, ConnectionStatus, SubscriptionGrant } from 'ngx-mqtt-client';
import { IClientOptions } from 'mqtt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _mqttService: MqttService) { }

  private bool: boolean

  config: IClientOptions = {
    host: '192.168.1.107', protocol: 'ws', port: 9001
  }

  isLogged(): boolean {
    return localStorage.getItem('isAuth') == 'true';

  }

  reconnect(): void {
    this.connect(localStorage.getItem('usr'), localStorage.getItem('pwd'))
  }

  /**
   * Manages connection manually.
   * If there is an active connection this will forcefully disconnect that first.
   * @param {IClientOptions} config
   */
  connect(user, pwd): void {
    this.config.username = user;
    this.config.password = pwd;
    this._mqttService.connect(this.config);
    this.statusLaunch()
    localStorage.setItem('usr', user)
    localStorage.setItem('pwd', pwd)
    setTimeout(() => {
      localStorage.setItem('isAuth', "" + this.bool)
    }, 500)
  }

  statusLaunch() {
    this._mqttService.status().subscribe((s: ConnectionStatus) => {
      const status = s === ConnectionStatus.CONNECTED ? 'CONNECTED' : 'DISCONNECTED';
      console.log(status == 'CONNECTED')
      this.bool = (status == 'CONNECTED')
      if (this.bool==false){
 
      }

    });
  }

  disconnect() {
    this._mqttService.end()
  }
}
