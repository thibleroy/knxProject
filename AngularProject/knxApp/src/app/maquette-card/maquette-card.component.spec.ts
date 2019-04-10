import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaquetteCardComponent } from './maquette-card.component';

describe('MaquetteCardComponent', () => {
  let component: MaquetteCardComponent;
  let fixture: ComponentFixture<MaquetteCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaquetteCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaquetteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
