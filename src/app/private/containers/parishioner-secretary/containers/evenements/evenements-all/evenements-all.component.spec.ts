import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementsAllComponent } from './evenements-all.component';

describe('EvenementsAllComponent', () => {
  let component: EvenementsAllComponent;
  let fixture: ComponentFixture<EvenementsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvenementsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
