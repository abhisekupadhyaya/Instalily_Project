import { Test, TestingModule } from '@nestjs/testing';
import { BrandInquiryService } from './brand-inquiry.service';

describe('BrandInquiryService', () => {
  let service: BrandInquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandInquiryService],
    }).compile();

    service = module.get<BrandInquiryService>(BrandInquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
