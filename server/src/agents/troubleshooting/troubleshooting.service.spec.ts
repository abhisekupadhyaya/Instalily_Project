import { Test, TestingModule } from '@nestjs/testing';
import { TroubleshootingService } from './troubleshooting.service';

describe('TroubleshootingService', () => {
  let service: TroubleshootingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TroubleshootingService],
    }).compile();

    service = module.get<TroubleshootingService>(TroubleshootingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
