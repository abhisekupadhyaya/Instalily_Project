import { Injectable } from '@nestjs/common';
import { Ollama } from 'ollama';

@Injectable()
export class IntelligenceService {
  private ollama: Ollama;

  constructor() {
    this.ollama = new Ollama({
        host: 'http://localhost:11434',
      });
  }

  async completeChat(chatQuery: string) {
    return this.ollama.chat({
      model: 'llama3.2:3b',
      messages: [{ role: 'user', content: chatQuery }],
    });
  }
}