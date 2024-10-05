import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ollama } from 'ollama';
import { Query, QueryDocument } from './query.schema';

@Injectable()
export class QueryService {
  private ollama: Ollama;

  constructor(@InjectModel(Query.name) private queryModel: Model<QueryDocument>) {
    this.ollama = new Ollama();
  }

  async processQueryRequest(chatId: string, chatQuery: string) {
    try {
      let queryDocument = await this.queryModel.findOne({ chatID: chatId });

      if (!queryDocument) {
        queryDocument = new this.queryModel({
          chatID: chatId,
          pageUrl: 'Https:h//hello',
          messages: []
        });
      }

      queryDocument.messages.push({
        role: 'user',
        content: chatQuery,
        timestamp: new Date()
      });

      const ollamaResponse = await this.ollama.chat({
        model: 'llama3.2:3b',
        messages: [{ role: 'user', content: chatQuery }],
      });

      queryDocument.messages.push({
        role: 'assistant',
        content: ollamaResponse.message.content,
        timestamp: new Date(ollamaResponse.created_at)
      });

      await queryDocument.save();

      return {
        role: 'assistant',
        content: ollamaResponse.message.content,
      };
    } catch (error) {
      console.error('Error processing query:', error);
      return {
        role: 'assistant',
        content: 'Sorry, I encountered an error while processing your query.',
      };
    }
  }
}