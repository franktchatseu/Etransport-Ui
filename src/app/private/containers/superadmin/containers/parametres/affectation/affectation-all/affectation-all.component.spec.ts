import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationAllComponent } from './affectation-all.component';

describe('AffectationAllComponent', () => {
  let component: AffectationAllComponent;
  let fixture: ComponentFixture<AffectationAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
