import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTransportElementsComponent } from './list-transport-elements.component';

describe('ListTransportElementsComponent', () => {
  let component: ListTransportElementsComponent;
  let fixture: ComponentFixture<ListTransportElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransportElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransportElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
