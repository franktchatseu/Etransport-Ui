import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeAllComponent } from './taxe-all.component';

describe('TaxeAllComponent', () => {
  let component: TaxeAllComponent;
  let fixture: ComponentFixture<TaxeAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxeAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
