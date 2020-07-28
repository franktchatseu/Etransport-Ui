import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportElementComponent } from './transport-element.component';

describe('TransportElementComponent', () => {
  let component: TransportElementComponent;
  let fixture: ComponentFixture<TransportElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
