import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiturgicalTextsComponent } from './liturgical-texts.component';

describe('LiturgicalTextsComponent', () => {
  let component: LiturgicalTextsComponent;
  let fixture: ComponentFixture<LiturgicalTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiturgicalTextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiturgicalTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
