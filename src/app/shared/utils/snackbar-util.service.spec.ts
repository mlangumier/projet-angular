import { TestBed } from '@angular/core/testing';

import { SnackbarUtilService } from './snackbar-util.service';

describe('Snackbar', () => {
  let service: SnackbarUtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarUtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
