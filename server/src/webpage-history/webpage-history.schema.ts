import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class WebpageHistory extends Document {
  @Prop({ required: true })
  pageUrl: string;

  @Prop({ required: true })
  product: string;

  @Prop({ type: Object, required: true })
  parsedContent: Record<string, any>;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const WebpageHistorySchema = SchemaFactory.createForClass(WebpageHistory);

WebpageHistorySchema.index({ pageUrl: 'text' });

WebpageHistorySchema.index({ pageUrl: 1, product: 1 });