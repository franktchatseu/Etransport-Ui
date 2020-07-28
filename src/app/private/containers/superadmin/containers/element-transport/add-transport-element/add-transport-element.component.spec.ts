import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransportElementComponent } from './add-transport-element.component';

describe('AddTransportElementComponent', () => {
  let component: AddTransportElementComponent;
  let fixture: ComponentFixture<AddTransportElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTransportElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTransportElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
