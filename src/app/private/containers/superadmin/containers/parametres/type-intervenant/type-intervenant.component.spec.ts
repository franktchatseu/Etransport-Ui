import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeIntervenantComponent } from './type-intervenant.component';

describe('TypeIntervenantComponent', () => {
  let component: TypeIntervenantComponent;
  let fixture: ComponentFixture<TypeIntervenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeIntervenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeIntervenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
