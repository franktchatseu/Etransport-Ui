import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathechumenDetailComponent } from './cathechumen-detail.component';

describe('CathechumenDetailComponent', () => {
  let component: CathechumenDetailComponent;
  let fixture: ComponentFixture<CathechumenDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathechumenDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathechumenDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
