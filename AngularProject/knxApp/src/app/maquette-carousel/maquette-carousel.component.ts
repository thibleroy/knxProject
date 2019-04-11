import { Component, OnInit } from '@angular/core';
import {
  ViewChild,
} from 'ngx-onsenui';
import { MaquetteCardComponent } from "../maquette-card/maquette-card.component";
@Component({
  selector: 'app-maquette-carousel',
  templateUrl: './maquette-carousel.component.html',
  styleUrls: ['./maquette-carousel.component.css']
})
export class MaquetteCarouselComponent implements OnInit {
  maquettes = ["0.5","0.6"]
  
  ngOnInit(): void {
  }

  @ViewChild('carousel') carousel;

  prev() {
    this.carousel.nativeElement.prev();
  }
  next() {
    this.carousel.nativeElement.next();
  }
}
