import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTransporterComponent } from './mail-transporter.component';

describe('MailTransporterComponent', () => {
  let component: MailTransporterComponent;
  let fixture: ComponentFixture<MailTransporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailTransporterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailTransporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
