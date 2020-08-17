import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionSheetAddComponent } from './intervention-sheet-add.component';

describe('InterventionSheetAddComponent', () => {
  let component: InterventionSheetAddComponent;
  let fixture: ComponentFixture<InterventionSheetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterventionSheetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterventionSheetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
