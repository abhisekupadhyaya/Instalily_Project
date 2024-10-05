import { Controller, Post, Param, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post(':chatId')
  async handleChatRequest(
    @Param('chatId') chatId: string,
    @Body() body: { chatQuery: string }
  ) {
    return this.chatService.processChatRequest(chatId, body.chatQuery);
  }
}