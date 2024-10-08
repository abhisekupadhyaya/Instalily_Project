import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryService } from './query.service';
import { Query, QuerySchema } from './query.schema';
import { ParsedParts, ParsedPartsSchema } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceModule } from '../../intelligence/intelligence.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Query.name, schema: QuerySchema },
      { name: ParsedParts.name, schema: ParsedPartsSchema }
    ]),
    IntelligenceModule
  ],
  providers: [QueryService],
  exports: [QueryService]
})
export class QueryModule {}