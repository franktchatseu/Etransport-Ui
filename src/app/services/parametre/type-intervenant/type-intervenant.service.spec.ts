import { TestBed } from '@angular/core/testing';

import { TypeIntervenantService } from './type-intervenant.service';

describe('TypeIntervenantService', () => {
  let service: TypeIntervenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeIntervenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
