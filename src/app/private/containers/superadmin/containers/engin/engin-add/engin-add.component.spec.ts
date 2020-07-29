import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnginAddComponent } from './engin-add.component';

describe('EnginAddComponent', () => {
  let component: EnginAddComponent;
  let fixture: ComponentFixture<EnginAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnginAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnginAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
