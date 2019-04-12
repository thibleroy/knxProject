import { Component, OnInit } from '@angular/core';
import ons from 'onsenui';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { IClientOptions } from 'mqtt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string =""
  pwd : string =""
  constructor(private router : Router, private App : AppComponent) { }

  config : IClientOptions = {host : '192.168.43.68', protocol : 'ws', clientId : 'Duncan', port : 9001, reconnectPeriod : 10000}

  ngOnInit() {

  }

  login() {
      this.config.username = this.user;
      this.config.password = this.pwd;
      this.App.connect(this.config)
      setTimeout(() => {
        if (this.App.isLogged()) {
          ons.notification.toast('Vous êtes connecté !', {timeout: 2000});
          this.router.navigateByUrl('/main');
        } else {
          ons.notification.toast('Identifiant ou mot de passe incorrect !', {timeout: 2000});
        }
      }, 500);

  };
}
