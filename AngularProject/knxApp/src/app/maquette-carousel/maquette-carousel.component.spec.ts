import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquetteCarouselComponent } from './maquette-carousel.component';

describe('MaquetteCarouselComponent', () => {
  let component: MaquetteCarouselComponent;
  let fixture: ComponentFixture<MaquetteCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquetteCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquetteCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
