import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectedService {
  maquetteAvailable = ["test1","test2"]
  ipConnected = ["test2"];

  constructor() { }


  connectedIp(ip): boolean {
    return this.ipConnected.indexOf(ip)!=-1
  }

}