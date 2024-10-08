import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompatibilityCheckService } from './compatibility-check.service';
import { ParsedParts, ParsedPartsSchema } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceModule } from '../../intelligence/intelligence.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ParsedParts.name, schema: ParsedPartsSchema }]),
    IntelligenceModule
  ],
  providers: [CompatibilityCheckService],
  exports: [CompatibilityCheckService]
})
export class CompatibilityCheckModule {}