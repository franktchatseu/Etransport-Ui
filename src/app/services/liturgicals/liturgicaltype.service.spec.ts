import { TestBed } from '@angular/core/testing';

import { LiturgicaltypeService } from './liturgicaltype.service';

describe('LiturgicaltypeService', () => {
  let service: LiturgicaltypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiturgicaltypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
