import { TestBed } from '@angular/core/testing';

import { CarosserieService } from './carosserie.service';

describe('CarosserieService', () => {
  let service: CarosserieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarosserieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
