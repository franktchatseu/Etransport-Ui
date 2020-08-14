import { TestBed } from '@angular/core/testing';

import { SpecialEndpointsService } from './special-endpoints.service';

describe('SpecialEndpointsService', () => {
  let service: SpecialEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialEndpointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
