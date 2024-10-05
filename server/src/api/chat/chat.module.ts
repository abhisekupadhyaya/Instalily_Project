import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AgentsModule } from '../../agents/agents.module';

@Module({
  imports: [AgentsModule],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}