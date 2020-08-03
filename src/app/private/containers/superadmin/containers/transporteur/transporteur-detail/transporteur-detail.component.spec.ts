import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteurDetailComponent } from './transporteur-detail.component';

describe('TransporteurDetailComponent', () => {
  let component: TransporteurDetailComponent;
  let fixture: ComponentFixture<TransporteurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporteurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
