import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
class Message {
  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Date.now })
  timestamp: Date;
}

const MessageSchema = SchemaFactory.createForClass(Message);

@Schema()
export class Query {
  @Prop({ required: true })
  chatID: string;

  @Prop({ type: [MessageSchema], default: [] })
  messages: Message[];

  @Prop({ required: true })
  pageUrl: string;
}

export type QueryDocument = Query & Document;
export const QuerySchema = SchemaFactory.createForClass(Query);