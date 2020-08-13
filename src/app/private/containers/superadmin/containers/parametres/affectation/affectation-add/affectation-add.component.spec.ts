import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationAddComponent } from './affectation-add.component';

describe('AffectationAddComponent', () => {
  let component: AffectationAddComponent;
  let fixture: ComponentFixture<AffectationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffectationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
