import { Component, OnInit } from '@angular/core';
import {
  OnsenModule,
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as ons from 'onsenui';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  value: string = '50';
  constructor() { }

  clickTurnOn() {
    ons.notification.alert('Clicked!');
  }
  ngOnInit() {
  }

}


  


@NgModule({
  imports: [OnsenModule],
  declarations: [MainComponent],
  bootstrap: [MainComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule);

