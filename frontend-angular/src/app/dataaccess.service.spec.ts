import { TestBed } from '@angular/core/testing';

import { DataaccessService } from './dataaccess.service';

describe('DataaccessService', () => {
  let service: DataaccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataaccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
