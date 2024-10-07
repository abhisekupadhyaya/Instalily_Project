import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebpageHistory } from './webpage-history.schema';
import { ParsedParts } from './parsed-parts.schema';
import * as cheerio from 'cheerio';

@Injectable()
export class WebpageHistoryService {
  constructor(
    @InjectModel(WebpageHistory.name) private webpageHistoryModel: Model<WebpageHistory>,
    @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedParts>
  ) {}

  async create(pageUrl: string, product: string, parsedContent: string): Promise<WebpageHistory> {
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

  async findOne(pageUrl: string): Promise<WebpageHistory | null> {
    return this.webpageHistoryModel.findOne({ pageUrl }).exec();
  }

  async getProcessedProductInfo(pageUrl: string): Promise<Record<string, any> | null> {
    const webpageHistory = await this.webpageHistoryModel.findOne({ pageUrl });
    if (!webpageHistory || !webpageHistory.parsedContent) {
      return null;
    }
  
    const $ = cheerio.load(webpageHistory.parsedContent);
  
    const getTextContent = (selector: string): string => {
      return $(selector).text().trim();
    };
  
    const getWorksWithInfo = (): Array<{ brand: string; modelNumber: string; description: string }> => {
      const container = $('.pd__crossref__list');
      if (container.length === 0) return [];
  
      return container.find('.row').map((_, row) => ({
        brand: $(row).find('.col-6.col-md-3').first().text().trim(),
        modelNumber: $(row).find('.col-6.col-md-3.col-lg-2').first().text().trim(),
        description: $(row).find('.col.col-md-6.col-lg-7').first().text().trim()
      })).get();
    };
  
    const getSymptoms = (): string[] => {
      const symptomsElement = $('.col-md-6.mt-3').first();
      if (symptomsElement.length > 0) {
        const symptomsText = symptomsElement.text().trim();
        const symptomsMatch = symptomsText.match(/This part fixes the following symptoms:(.*)/s);
        if (symptomsMatch) {
          return symptomsMatch[1].trim().split('|').map(item => item.trim());
        }
      }
      return [];
    };
  
    const getWorksWithProducts = (): string => {
      const worksWithElement = $('.col-md-6.mt-3').eq(1);
      if (worksWithElement.length > 0) {
        const worksWithText = worksWithElement.text().trim();
        const worksWithMatch = worksWithText.match(/This part works with the following products:(.*)/s);
        if (worksWithMatch) {
          return worksWithMatch[1].trim();
        }
      }
      return '';
    };

    const processedInfo = {
        title: getTextContent('h1.title-lg[itemprop="name"]'),
        partSelectNumber: getTextContent('div.mt-3.mb-2 span[itemprop="productID"]'),
        manufacturerPartNumber: getTextContent('div.mb-2 span[itemprop="mpn"]'),
        manufacturer: getTextContent('span[itemprop="brand"] span[itemprop="name"]'),
        forBrands: getTextContent('span[itemprop="brand"] + span'),
        description: getTextContent('div[itemprop="description"]'),
        symptoms: getSymptoms(),
        worksWithProducts: getWorksWithProducts(),
        worksWithInfo: getWorksWithInfo(),
        replacedParts: getTextContent('.col-md-6.mt-3:nth-of-type(3) div[data-collapse-container]')
      };

    return this.parsedPartsModel.findOneAndUpdate(
        { pageUrl },
        {
          $set: processedInfo
        },
        { upsert: true, new: true }
      ).exec();
  }
}