import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathechistAllComponent } from './cathechist-all.component';

describe('CathechistAllComponent', () => {
  let component: CathechistAllComponent;
  let fixture: ComponentFixture<CathechistAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathechistAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathechistAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
