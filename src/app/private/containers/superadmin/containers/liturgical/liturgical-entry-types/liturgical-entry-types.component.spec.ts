import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiturgicalEntryTypesComponent } from './liturgical-entry-types.component';

describe('LiturgicalEntryTypesComponent', () => {
  let component: LiturgicalEntryTypesComponent;
  let fixture: ComponentFixture<LiturgicalEntryTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiturgicalEntryTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiturgicalEntryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
