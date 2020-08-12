import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalVisitAddComponent } from './technical-visit-add.component';

describe('TechnicalVisitAddComponent', () => {
  let component: TechnicalVisitAddComponent;
  let fixture: ComponentFixture<TechnicalVisitAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalVisitAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalVisitAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
