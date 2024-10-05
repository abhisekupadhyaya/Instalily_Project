import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QueryService } from './query.service';
import { Query, QuerySchema } from './query.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Query.name, schema: QuerySchema }])
  ],
  providers: [QueryService],
  exports: [QueryService]
})
export class QueryModule {}