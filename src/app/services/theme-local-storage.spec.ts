import { TestBed } from '@angular/core/testing';

import { ThemeLocalStorage } from './theme-local-storage';

describe('ThemeLocalStorage', () => {
  let service: ThemeLocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeLocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
