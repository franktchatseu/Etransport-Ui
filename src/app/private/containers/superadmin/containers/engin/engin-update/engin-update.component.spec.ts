import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginUpdateComponent } from './engin-update.component';

describe('EnginUpdateComponent', () => {
  let component: EnginUpdateComponent;
  let fixture: ComponentFixture<EnginUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
