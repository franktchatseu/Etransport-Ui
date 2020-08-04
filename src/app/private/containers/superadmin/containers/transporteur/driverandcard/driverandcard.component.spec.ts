import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverandcardComponent } from './driverandcard.component';

describe('DriverandcardComponent', () => {
  let component: DriverandcardComponent;
  let fixture: ComponentFixture<DriverandcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverandcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverandcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
