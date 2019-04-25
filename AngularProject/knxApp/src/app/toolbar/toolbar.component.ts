import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { AuthService } from "../auth-service.service";
import ons from 'onsenui';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor ( private App : AppComponent, private router : Router, private auth : AuthService){}
  

  confirm() {
    ons.notification.confirm({
      message: 'Voulez-vous vraiment vous déconnecter ?',
      cancelable: true,
      callback: i => {
        if (i == 1) {
          this.disconnect();
        }
      }
    });
  }
  
  ngOnInit() {
  }

  disconnect(){
    localStorage.setItem('isAuth','false');
    this.auth.disconnect()
    window.location.reload();
  }


}
