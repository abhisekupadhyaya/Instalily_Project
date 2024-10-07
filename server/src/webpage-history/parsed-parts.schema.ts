import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ParsedParts extends Document {
  @Prop({ required: true, index: true })
  pageUrl: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  partSelectNumber: string;

  @Prop({ required: true })
  manufacturerPartNumber: string;

  @Prop({ required: true })
  manufacturer: string;

  @Prop({ required: true })
  forBrands: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  symptoms: string[];

  @Prop({ default: '' })
  worksWithProducts: string;

  @Prop({  _id: false, type: [{ brand: String, modelNumber: String, description: String }], default: [] })
  worksWithInfo: Array<{ brand: string; modelNumber: string; description: string }>;

  @Prop({ default: '' })
  replacedParts: string;
}

export const ParsedPartsSchema = SchemaFactory.createForClass(ParsedParts);