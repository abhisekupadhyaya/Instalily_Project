import { Injectable } from '@nestjs/common';

@Injectable()
export class QueryService {
    processQueryRequest(chatId: string, chatQuery: string) {
        const message = {
          role: "assistant",
          content: `Backend Received: ChatID ${chatId}, Chat Query "${chatQuery}"`
        };
        return message;
      }
}