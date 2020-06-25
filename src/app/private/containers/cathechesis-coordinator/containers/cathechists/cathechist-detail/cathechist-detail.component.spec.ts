import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathechistDetailComponent } from './cathechist-detail.component';

describe('CathechistDetailComponent', () => {
  let component: CathechistDetailComponent;
  let fixture: ComponentFixture<CathechistDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathechistDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathechistDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
