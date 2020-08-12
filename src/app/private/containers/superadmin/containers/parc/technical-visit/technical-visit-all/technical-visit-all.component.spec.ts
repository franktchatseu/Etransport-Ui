import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalVisitAllComponent } from './technical-visit-all.component';

describe('TechnicalVisitAllComponent', () => {
  let component: TechnicalVisitAllComponent;
  let fixture: ComponentFixture<TechnicalVisitAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalVisitAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalVisitAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
