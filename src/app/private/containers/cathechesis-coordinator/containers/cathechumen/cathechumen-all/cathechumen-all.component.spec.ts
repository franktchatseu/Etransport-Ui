import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathechumenAllComponent } from './cathechumen-all.component';

describe('CathechumenAllComponent', () => {
  let component: CathechumenAllComponent;
  let fixture: ComponentFixture<CathechumenAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathechumenAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathechumenAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
