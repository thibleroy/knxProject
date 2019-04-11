import { Component, OnInit } from '@angular/core';
import ons from 'onsenui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : string =""
  pwd : string =""
  constructor(private router : Router) { }

  ngOnInit() {
  }

  login() {
    if (this.user === 'dun' && this.pwd === 'dun') {
      ons.notification.toast('Vous êtes connecté !', {timeout: 2000});
      this.router.navigateByUrl('/main');
    } else {
      ons.notification.toast('Identifiant ou mot de passe incorrect !', {timeout: 2000});
    }
  };
}
