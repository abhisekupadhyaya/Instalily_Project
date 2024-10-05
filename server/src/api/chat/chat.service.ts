import { Injectable } from '@nestjs/common';
import { AgentsService } from '../../agents/agents.service';

@Injectable()
export class ChatService {
  constructor(private agentsService: AgentsService) {}

  async processChatRequest(chatId: string, chatQuery: string) {
    return this.agentsService.completeChat(chatId, chatQuery);
  }
}