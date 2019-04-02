import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor ( private App : AppComponent){}

  checked : boolean = false;

  
  ngOnInit() {
  }

  @Output() switchCheck = new EventEmitter();
Checked = false;

  connectToDevice(){
    this.checked = !this.checked
    if(this.checked) this.App.sendMsg('knx/action', 'connect', null)
    else {this.App.sendMsg('knx/action', 'disconnect',null)}
    this.switchCheck.emit(this.checked)
  }
}
