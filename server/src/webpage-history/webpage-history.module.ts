import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebpageHistoryService } from './webpage-history.service';
import { WebpageHistory, WebpageHistorySchema } from './webpage-history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WebpageHistory.name, schema: WebpageHistorySchema }])
  ],
  providers: [WebpageHistoryService],
  exports: [WebpageHistoryService]
})
export class WebpageHistoryModule {}