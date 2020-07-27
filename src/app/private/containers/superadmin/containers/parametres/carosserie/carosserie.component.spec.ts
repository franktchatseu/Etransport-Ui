import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarosserieComponent } from './carosserie.component';

describe('CarosserieComponent', () => {
  let component: CarosserieComponent;
  let fixture: ComponentFixture<CarosserieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarosserieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarosserieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
