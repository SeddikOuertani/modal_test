import { TestBed } from '@angular/core/testing';

import { MockCarService } from './mock-car.service';

describe('MockCarService', () => {
  let service: MockCarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockCarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
