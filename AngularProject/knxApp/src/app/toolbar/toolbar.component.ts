import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  checked : boolean = false;

  ngOnInit() {
  }

  connectToDevice(){
    this.checked = !this.checked
    if(this.checked) console.log("test")
    else {console.log("deco")}
  }
}
