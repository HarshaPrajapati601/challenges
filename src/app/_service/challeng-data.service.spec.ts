import { TestBed } from '@angular/core/testing';

import { ChallengDataService } from './challeng-data.service';

describe('ChallengDataService', () => {
  let service: ChallengDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
