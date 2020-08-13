import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceAddComponent } from './car-insurance-add.component';

describe('CarInsuranceAddComponent', () => {
  let component: CarInsuranceAddComponent;
  let fixture: ComponentFixture<CarInsuranceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInsuranceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInsuranceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
