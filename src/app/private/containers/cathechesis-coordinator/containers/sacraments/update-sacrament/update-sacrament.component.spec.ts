import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSacramentComponent } from './update-sacrament.component';

describe('UpdateSacramentComponent', () => {
  let component: UpdateSacramentComponent;
  let fixture: ComponentFixture<UpdateSacramentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSacramentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSacramentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
