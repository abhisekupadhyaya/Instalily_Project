import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryService } from './query.service';
import { Query, QuerySchema } from './query.schema'
import { ParsedParts, ParsedPartsSchema } from '../../webpage-history/parsed-parts.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Query.name, schema: QuerySchema }]),
    MongooseModule.forFeature([{ name: ParsedParts.name, schema: ParsedPartsSchema }])
  ],
  providers: [QueryService],
  exports: [QueryService]
})
export class QueryModule {}