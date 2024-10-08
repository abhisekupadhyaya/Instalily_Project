import { Test, TestingModule } from '@nestjs/testing';
import { ProductInquiryService } from './product-inquiry.service';

describe('ProductInquiryService', () => {
  let service: ProductInquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInquiryService],
    }).compile();

    service = module.get<ProductInquiryService>(ProductInquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
