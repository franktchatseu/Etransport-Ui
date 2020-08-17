import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSheetAllComponent } from './intervention-sheet-all.component';

describe('InterventionSheetAllComponent', () => {
  let component: InterventionSheetAllComponent;
  let fixture: ComponentFixture<InterventionSheetAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionSheetAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionSheetAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
