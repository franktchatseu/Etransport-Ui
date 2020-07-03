import { TestBed } from '@angular/core/testing';

import { LiturgicalentrytypeService } from './liturgicalentrytype.service';

describe('LiturgicalentrytypeService', () => {
  let service: LiturgicalentrytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiturgicalentrytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
