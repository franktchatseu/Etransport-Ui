import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationUpdateComponent } from './affectation-update.component';

describe('AffectationUpdateComponent', () => {
  let component: AffectationUpdateComponent;
  let fixture: ComponentFixture<AffectationUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
