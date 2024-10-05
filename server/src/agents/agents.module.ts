import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { QueryModule } from './query/query.module';

@Module({
  imports: [QueryModule],
  providers: [AgentsService],
  exports: [AgentsService]
})
export class AgentsModule {}