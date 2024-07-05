import { TestBed } from '@angular/core/testing';

import { ChatgptApiKeyService } from './chatgpt-api-key.service';

describe('ChatgptApiKeyService', () => {
  let service: ChatgptApiKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatgptApiKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
