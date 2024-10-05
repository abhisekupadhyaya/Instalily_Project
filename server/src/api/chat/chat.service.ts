import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  processChatRequest(chatId: string, chatQuery: string) {
    const message = {
      role: "assistant",
      content: `Backend Received: ChatID ${chatId}, Chat Query "${chatQuery}"`
    };
    return message;
  }
}