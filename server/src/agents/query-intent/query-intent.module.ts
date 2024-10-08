import { Module } from '@nestjs/common';
import { QueryIntentService } from './query-intent.service';
import { IntelligenceModule } from '../../intelligence/intelligence.module';

@Module({
  imports: [
    IntelligenceModule
  ],
  providers: [QueryIntentService],
  exports: [QueryIntentService]
})
export class QueryIntentModule {}