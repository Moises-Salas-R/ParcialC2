import { TestBed } from '@angular/core/testing';

import { ExternalPushService } from './external-push.service';

describe('ExternalpushserviceService', () => {
  let service: ExternalPushService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalPushService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
