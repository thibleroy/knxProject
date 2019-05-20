import { Component, OnInit } from '@angular/core';
import ons from 'onsenui';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import { AuthService } from "../auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: string = ""
  pwd: string = ""
  constructor(private router: Router, private App: AppComponent, private auth: AuthService) { }

  //3.83.149.37
  ngOnInit() {
    if (this.auth.isLogged()) {
      this.router.navigateByUrl('/main')
    }
  }

  login() {
    console.log("login")
    this.auth.connect(this.user, this.pwd)
    console.log("login2")

    setTimeout(() => {
      console.log("login3")

      if (this.auth.isLogged()) {
        ons.notification.toast('Vous êtes connecté !', { timeout: 2000 });
        this.router.navigateByUrl('/main');
      } else {
        ons.notification.toast('Identifiant ou mot de passe incorrect !', { timeout: 2000 });
      }
    }, 1000);

  };
}
