import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeDetailComponent } from './taxe-detail.component';

describe('TaxeDetailComponent', () => {
  let component: TaxeDetailComponent;
  let fixture: ComponentFixture<TaxeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
