import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectedService {
  maquetteAvailable = []
  ipConnected = [];

  constructor() { }


  connectedIp(ip): boolean {
    return this.ipConnected.indexOf(ip)!=-1
  }

}