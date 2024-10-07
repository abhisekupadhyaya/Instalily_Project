import { Test, TestingModule } from '@nestjs/testing';
import { WebpageHistoryService } from './webpage-history.service';

describe('WebpageHistoryService', () => {
  let service: WebpageHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebpageHistoryService],
    }).compile();

    service = module.get<WebpageHistoryService>(WebpageHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
