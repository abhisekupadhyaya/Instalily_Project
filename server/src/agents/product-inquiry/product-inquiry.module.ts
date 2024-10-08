import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductInquiryService } from './product-inquiry.service';
import { ParsedParts, ParsedPartsSchema } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceModule } from '../../intelligence/intelligence.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ParsedParts.name, schema: ParsedPartsSchema }]),
    IntelligenceModule
  ],
  providers: [ProductInquiryService],
  exports: [ProductInquiryService]
})
export class ProductInquiryModule {}
