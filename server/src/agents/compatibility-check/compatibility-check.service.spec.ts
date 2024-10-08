import { Test, TestingModule } from '@nestjs/testing';
import { CompatibilityCheckService } from './compatibility-check.service';

describe('CompatibilityCheckService', () => {
  let service: CompatibilityCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompatibilityCheckService],
    }).compile();

    service = module.get<CompatibilityCheckService>(CompatibilityCheckService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
