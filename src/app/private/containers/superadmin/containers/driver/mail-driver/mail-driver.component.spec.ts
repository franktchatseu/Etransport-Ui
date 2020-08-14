import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDriverComponent } from './mail-driver.component';

describe('MailDriverComponent', () => {
  let component: MailDriverComponent;
  let fixture: ComponentFixture<MailDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
