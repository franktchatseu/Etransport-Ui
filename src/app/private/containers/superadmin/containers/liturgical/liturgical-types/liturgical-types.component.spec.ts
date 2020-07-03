import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiturgicalTypesComponent } from './liturgical-types.component';

describe('LiturgicalTypesComponent', () => {
  let component: LiturgicalTypesComponent;
  let fixture: ComponentFixture<LiturgicalTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiturgicalTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiturgicalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
