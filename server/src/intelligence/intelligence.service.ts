import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ollama } from 'ollama';

@Injectable()
export class IntelligenceService {
  private ollama: Ollama;

  constructor(private configService: ConfigService) {
    const ollamaUrl = this.configService.get<string>('OLLAMA_URL') || 'http://localhost:11434';
    this.ollama = new Ollama({
      host: ollamaUrl,
    });
  }

  async completeChat(chatQuery: string) {
    return this.ollama.chat({
      model: 'llama3.2:3b',
      messages: [{ role: 'user', content: chatQuery }],
    });
  }
}