import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionOrderAddComponent } from './mission-order-add.component';

describe('MissionOrderAddComponent', () => {
  let component: MissionOrderAddComponent;
  let fixture: ComponentFixture<MissionOrderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissionOrderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissionOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
