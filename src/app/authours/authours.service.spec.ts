import { TestBed } from '@angular/core/testing';

import { AuthoursService } from './authours.service';

describe('AuthorsService', () => {
  let service: AuthoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
