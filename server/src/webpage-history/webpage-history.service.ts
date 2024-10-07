// server/src/webpage-history/webpage-history.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebpageHistory } from './webpage-history.schema';

@Injectable()
export class WebpageHistoryService {
  constructor(
    @InjectModel(WebpageHistory.name) private webpageHistoryModel: Model<WebpageHistory>
  ) {}

  async create(pageUrl: string, product: string, parsedContent: Record<string, any>): Promise<WebpageHistory> {
    return this.webpageHistoryModel.findOneAndUpdate(
        { pageUrl },
        {
          $set: {
            product,
            parsedContent,
            timestamp: new Date()
          }
        },
        { upsert: true, new: true }
      ).exec();
  }

  async update(pageUrl: string, product: string, parsedContent: Record<string, any>): Promise<WebpageHistory | null> {
    const updatedRecord = await this.webpageHistoryModel.findOneAndUpdate(
      { pageUrl },
      {
        $set: {
          product,
          parsedContent,
          timestamp: new Date()
        }
      },
      { new: true }
    ).exec();

    return updatedRecord;
  }

  async findOne(pageUrl: string): Promise<WebpageHistory | null> {
    return this.webpageHistoryModel.findOne({ pageUrl }).exec();
  }
}