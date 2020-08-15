import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeActionsComponent } from './range-actions.component';

describe('RangeActionsComponent', () => {
  let component: RangeActionsComponent;
  let fixture: ComponentFixture<RangeActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
