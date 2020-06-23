import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSacramentsComponent } from './list-sacraments.component';

describe('ListSacramentsComponent', () => {
  let component: ListSacramentsComponent;
  let fixture: ComponentFixture<ListSacramentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSacramentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSacramentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
