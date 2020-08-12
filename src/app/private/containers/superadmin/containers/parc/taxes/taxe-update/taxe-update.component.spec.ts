import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeUpdateComponent } from './taxe-update.component';

describe('TaxeUpdateComponent', () => {
  let component: TaxeUpdateComponent;
  let fixture: ComponentFixture<TaxeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
