import { TestBed } from '@angular/core/testing';

import { ConnectedService } from './connected.service';

describe('ConnectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectedService = TestBed.get(ConnectedService);
    expect(service).toBeTruthy();
  });
});
