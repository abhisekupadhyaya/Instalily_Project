import { Injectable } from '@nestjs/common';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { intentPrompt } from './prompt';

@Injectable()
export class QueryIntentService {
  constructor(private intelligenceService: IntelligenceService) {}

  async classifyUserIntent(userMessage: string): Promise<string> {
    const prompt = intentPrompt.replace('{userMessage}', userMessage);
    const response = await this.intelligenceService.completeChat(prompt);
    return response.message.content.trim();
  }
}