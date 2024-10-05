import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    RouterModule.register([
      {
        path: 'api',
        children: [
          {
            path: 'chat',
            module: ChatModule,
          },
        ],
      },
    ]),
    ChatModule,
  ],
})
export class ApiModule {}