import { Test, TestingModule } from '@nestjs/testing';
import { InstallationHelpService } from './installation-help.service';

describe('InstallationHelpService', () => {
  let service: InstallationHelpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstallationHelpService],
    }).compile();

    service = module.get<InstallationHelpService>(InstallationHelpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
