import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WebpageHistory {
  @Prop({ required: true })
  pageUrl: string;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  parsedContent: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export type WebpageHistoryDocument = WebpageHistory & Document;
export const WebpageHistorySchema = SchemaFactory.createForClass(WebpageHistory);

WebpageHistorySchema.index({ pageUrl: 'text' });

WebpageHistorySchema.index({ pageUrl: 1, product: 1 });