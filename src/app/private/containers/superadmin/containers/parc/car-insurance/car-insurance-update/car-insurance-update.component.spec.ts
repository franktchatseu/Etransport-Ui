import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInsuranceUpdateComponent } from './car-insurance-update.component';

describe('CarInsuranceUpdateComponent', () => {
  let component: CarInsuranceUpdateComponent;
  let fixture: ComponentFixture<CarInsuranceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarInsuranceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarInsuranceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
