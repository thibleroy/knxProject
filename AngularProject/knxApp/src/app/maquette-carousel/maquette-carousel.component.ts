import { Component, OnInit } from '@angular/core';
import {
  ViewChild,
} from 'ngx-onsenui';
import { MaquetteCardComponent } from "../maquette-card/maquette-card.component";
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';
import { ConnectedService } from '../connected.service';
@Component({
  selector: 'app-maquette-carousel',
  templateUrl: './maquette-carousel.component.html',
  styleUrls: ['./maquette-carousel.component.css']
})
export class MaquetteCarouselComponent implements OnInit {

  maquettes = []
  constructor(private router: Router, private auth: AuthService, private connected : ConnectedService) { }


  ngOnInit(): void {
    if (this.auth.isLogged()) {
      this.maquettes = this.connected.maquetteAvailable
    } else { this.router.navigateByUrl('/') }
  }

  @ViewChild('carousel') carousel;

  prev() {
    this.carousel.nativeElement.prev();
  }
  next() {
    this.carousel.nativeElement.next();
  }
}
