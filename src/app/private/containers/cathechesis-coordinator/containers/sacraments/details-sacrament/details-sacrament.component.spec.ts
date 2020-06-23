import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSacramentComponent } from './details-sacrament.component';

describe('DetailsSacramentComponent', () => {
  let component: DetailsSacramentComponent;
  let fixture: ComponentFixture<DetailsSacramentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSacramentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSacramentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
