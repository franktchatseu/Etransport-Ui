import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementTransportDetailComponent } from './element-transport-detail.component';

describe('ElementTransportDetailComponent', () => {
  let component: ElementTransportDetailComponent;
  let fixture: ComponentFixture<ElementTransportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementTransportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementTransportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
