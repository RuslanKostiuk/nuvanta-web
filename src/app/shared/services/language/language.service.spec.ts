import {TestBed} from '@angular/core/testing';

import {LanguageServiceTsService} from './language.service';

describe('LanguageServiceTsService', () => {
  let service: LanguageServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
