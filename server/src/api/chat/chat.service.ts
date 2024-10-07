import { Injectable } from '@nestjs/common';
import { AgentsService } from '../../agents/agents.service';
import { WebpageHistoryService } from '../../webpage-history/webpage-history.service';

@Injectable()
export class ChatService {
  constructor(
    private agentsService: AgentsService,
    private webpageHistoryService: WebpageHistoryService
  ) {}

  async processChatRequest(chatId: string, chatQuery: string) {
    return this.agentsService.completeChat(chatId, chatQuery);
  }

  async updateWebpage(chatId: string, pageUrl: string, product: string, parsedContent: Record<string, any>) {
    await this.webpageHistoryService.create(pageUrl, product, parsedContent);
    return this.agentsService.createChat(chatId, pageUrl);
  }
}