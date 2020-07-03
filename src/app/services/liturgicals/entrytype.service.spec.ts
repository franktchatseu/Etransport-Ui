import { TestBed } from '@angular/core/testing';

import { EntrytypeService } from './entrytype.service';

describe('EntrytypeService', () => {
  let service: EntrytypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrytypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
