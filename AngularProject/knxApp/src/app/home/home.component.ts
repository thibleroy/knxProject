import { Component, OnInit } from '@angular/core';
import {
  OnsenModule,
  NgModule,
  ViewChild,
  CUSTOM_ELEMENTS_SCHEMA
} from 'ngx-onsenui';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {
  @ViewChild('carousel') carousel;
  prev() {
    this.carousel.nativeElement.prev();
  }
  next() {
    this.carousel.nativeElement.next();
  }
  
  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [OnsenModule],
  declarations: [HomeComponent],
  bootstrap: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
class HomeModule { }

platformBrowserDynamic().bootstrapModule(HomeModule);