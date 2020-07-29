import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginAllComponent } from './engin-all.component';

describe('EnginAllComponent', () => {
  let component: EnginAllComponent;
  let fixture: ComponentFixture<EnginAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
