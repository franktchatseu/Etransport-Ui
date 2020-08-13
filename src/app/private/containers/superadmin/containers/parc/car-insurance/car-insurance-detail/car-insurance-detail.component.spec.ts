import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceDetailComponent } from './car-insurance-detail.component';

describe('CarInsuranceDetailComponent', () => {
  let component: CarInsuranceDetailComponent;
  let fixture: ComponentFixture<CarInsuranceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInsuranceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInsuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
