import { TestBed } from '@angular/core/testing';

import { TransportelementService } from './transportelement.service';

describe('TransportelementService', () => {
  let service: TransportelementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportelementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
