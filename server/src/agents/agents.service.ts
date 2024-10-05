import { Injectable } from '@nestjs/common';
import { QueryService } from './query/query.service';

@Injectable()
export class AgentsService {
  constructor(private queryService: QueryService) {}

  completeChat(chatId: string, chatQuery: string) {
    return this.queryService.processQueryRequest(chatId, chatQuery);
  }
}