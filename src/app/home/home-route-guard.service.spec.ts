import { TestBed } from '@angular/core/testing';

import { HomeRouteGuardService } from './home-route-guard.service';

describe('HomeRouteGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeRouteGuardService = TestBed.get(HomeRouteGuardService);
    expect(service).toBeTruthy();
  });
});
