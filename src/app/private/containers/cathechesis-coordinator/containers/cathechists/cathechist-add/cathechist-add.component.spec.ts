import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CathechistAddComponent } from './cathechist-add.component';

describe('CathechistAddComponent', () => {
  let component: CathechistAddComponent;
  let fixture: ComponentFixture<CathechistAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CathechistAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CathechistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
