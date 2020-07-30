import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginDetailComponent } from './engin-detail.component';

describe('EnginDetailComponent', () => {
  let component: EnginDetailComponent;
  let fixture: ComponentFixture<EnginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
