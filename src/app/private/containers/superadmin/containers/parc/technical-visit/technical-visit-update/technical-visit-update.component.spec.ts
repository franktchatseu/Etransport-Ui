import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalVisitUpdateComponent } from './technical-visit-update.component';

describe('TechnicalVisitUpdateComponent', () => {
  let component: TechnicalVisitUpdateComponent;
  let fixture: ComponentFixture<TechnicalVisitUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalVisitUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalVisitUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
