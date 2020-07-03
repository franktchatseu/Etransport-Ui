import { TestBed } from '@angular/core/testing';

import { LiturgicaltextService } from './liturgicaltext.service';

describe('LiturgicaltextService', () => {
  let service: LiturgicaltextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiturgicaltextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
