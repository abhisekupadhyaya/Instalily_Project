import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AgentsModule } from '../../agents/agents.module';
import { WebpageHistoryModule } from '../../webpage-history/webpage-history.module';

@Module({
  imports: [AgentsModule, WebpageHistoryModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}