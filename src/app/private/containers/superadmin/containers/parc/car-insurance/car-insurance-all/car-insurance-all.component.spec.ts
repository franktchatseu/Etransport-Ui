import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceAllComponent } from './car-insurance-all.component';

describe('CarInsuranceAllComponent', () => {
  let component: CarInsuranceAllComponent;
  let fixture: ComponentFixture<CarInsuranceAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInsuranceAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInsuranceAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
