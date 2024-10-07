import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebpageHistoryService } from './webpage-history.service';
import { WebpageHistory, WebpageHistorySchema } from './webpage-history.schema';
import { ParsedParts, ParsedPartsSchema } from './parsed-parts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WebpageHistory.name, schema: WebpageHistorySchema }]),
    MongooseModule.forFeature([{ name: ParsedParts.name, schema: ParsedPartsSchema }])
  ],
  providers: [WebpageHistoryService],
  exports: [WebpageHistoryService]
})
export class WebpageHistoryModule {}