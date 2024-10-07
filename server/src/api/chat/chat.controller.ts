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

  @Post(':chatId/update-webpage')
  async updateWebpage(
    @Param('chatId') chatId: string,
    @Body() body: { pageUrl: string; product: string; parsedContent: string }
  ) {
    const { pageUrl, product, parsedContent } = body;
    return this.chatService.updateWebpage(chatId, pageUrl, product, parsedContent);
  }
}