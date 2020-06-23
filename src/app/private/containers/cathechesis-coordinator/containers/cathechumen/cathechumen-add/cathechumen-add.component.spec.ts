import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathechumenAddComponent } from './cathechumen-add.component';

describe('CathechumenAddComponent', () => {
  let component: CathechumenAddComponent;
  let fixture: ComponentFixture<CathechumenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathechumenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathechumenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
