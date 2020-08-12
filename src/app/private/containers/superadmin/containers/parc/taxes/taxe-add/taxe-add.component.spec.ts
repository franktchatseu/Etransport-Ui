import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxeAddComponent } from './taxe-add.component';

describe('TaxeAddComponent', () => {
  let component: TaxeAddComponent;
  let fixture: ComponentFixture<TaxeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
