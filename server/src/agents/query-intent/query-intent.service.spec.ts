import { Test, TestingModule } from '@nestjs/testing';
import { QueryIntentService } from './query-intent.service';

describe('QueryIntentService', () => {
  let service: QueryIntentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryIntentService],
    }).compile();

    service = module.get<QueryIntentService>(QueryIntentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
