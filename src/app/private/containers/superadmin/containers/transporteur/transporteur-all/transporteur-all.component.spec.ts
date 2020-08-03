import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransporteurAllComponent } from './transporteur-all.component';

describe('TransporteurAllComponent', () => {
  let component: TransporteurAllComponent;
  let fixture: ComponentFixture<TransporteurAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransporteurAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteurAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
