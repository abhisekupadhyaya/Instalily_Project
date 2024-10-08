import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Query, QueryDocument } from './query.schema';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';

@Injectable()
export class QueryService {
  constructor(
    @InjectModel(Query.name) private queryModel: Model<QueryDocument>,
    @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
    private intelligenceService: IntelligenceService
  ) {}

  async processQueryRequest(chatId: string, chatQuery: string) {
    try {
      const queryDocument = await this.getOrCreateQueryDocument(chatId);
      
      queryDocument.messages.push({ role: 'user', content: chatQuery, timestamp: new Date() });

      if (queryDocument.pageUrl) {
        const parsedPart = await this.parsedPartsModel.findOne({ pageUrl: queryDocument.pageUrl }).exec();
        console.log(parsedPart);
        if (parsedPart) {
          const parsedPartString = JSON.stringify(parsedPart);
          chatQuery = `${parsedPartString}\n${chatQuery}`;
        }
      }

      const ollamaResponse = await this.intelligenceService.completeChat(chatQuery);
      
      queryDocument.messages.push({
        role: 'assistant',
        content: ollamaResponse.message.content,
        timestamp: new Date(ollamaResponse.created_at)
      });
      
      await queryDocument.save();

      return { role: 'assistant', content: ollamaResponse.message.content };
    } catch (error) {
      console.error('Error processing query:', error);
      return { role: 'assistant', content: 'Sorry, I encountered an error while processing your query.' };
    }
  }

  async createChat(chatId: string, pageUrl: string) {
    try {
      const queryDocument = await this.getOrCreateQueryDocument(chatId, pageUrl);
      const action = queryDocument.isNew ? 'created' : 'updated';

      return { success: true, message: `Chat ${action} successfully`, chatId, pageUrl };
    } catch (error) {
      console.error('Error creating/updating chat:', error);
      return { success: false, message: 'An error occurred while creating/updating the chat', error: error.message };
    }
  }

  private async getOrCreateQueryDocument(chatId: string, pageUrl: string = 'none') {
    let queryDocument = await this.queryModel.findOne({ chatID: chatId });
    if (!queryDocument) {
      queryDocument = new this.queryModel({ chatID: chatId, pageUrl: pageUrl, messages: [] });
      await queryDocument.save();
    } else if (pageUrl !== 'none') {
      queryDocument.pageUrl = pageUrl;
      await queryDocument.save();
    }
    return queryDocument;
  }

}