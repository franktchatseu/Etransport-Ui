import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalVisitDetailComponent } from './technical-visit-detail.component';

describe('TechnicalVisitDetailComponent', () => {
  let component: TechnicalVisitDetailComponent;
  let fixture: ComponentFixture<TechnicalVisitDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalVisitDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalVisitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
