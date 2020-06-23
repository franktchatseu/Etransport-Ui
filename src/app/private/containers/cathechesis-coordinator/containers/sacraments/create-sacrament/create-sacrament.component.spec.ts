import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSacramentComponent } from './create-sacrament.component';

describe('CreateSacramentComponent', () => {
  let component: CreateSacramentComponent;
  let fixture: ComponentFixture<CreateSacramentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSacramentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSacramentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
