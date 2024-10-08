import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { smallTalkPrompt } from './prompt';

@Injectable()
export class SmallTalkService {
    constructor(
        @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
        private intelligenceService: IntelligenceService
    ) {}

    async processSmallTalkRequest(chatQuery: string, pageUrl?: string) {
        const formattedPrompt = await this.formatPrompt(chatQuery, pageUrl);
        return await this.intelligenceService.completeChat(formattedPrompt);
    }

    private async formatPrompt(chatQuery: string, pageUrl?: string): Promise<string> {
        let prompt = smallTalkPrompt;
        let partInfo = '';
        
        if (pageUrl) {
            const parsedPart = await this.parsedPartsModel.findOne({ pageUrl }).exec();
            if (parsedPart) {
                partInfo = `
                    - Manufacturer: ${parsedPart.manufacturer}
                    - Compatible Brands: ${parsedPart.forBrands}
                    - Common Symptoms: ${parsedPart.symptoms.join(', ')}
                    - Part Name: ${parsedPart.title}
                    - Part Number: ${parsedPart.partSelectNumber}
                    - Description: ${parsedPart.description}
                `;
                if (parsedPart.worksWithProducts) {
                    partInfo += `- Works With: ${parsedPart.worksWithProducts}\n`;
                }
                if (parsedPart.replacedParts) {
                    partInfo += `- Replaces: ${parsedPart.replacedParts}\n`;
                }
            }
        }
    
        prompt = prompt.replace('{{partInfo}}', partInfo.trim());
        prompt = prompt.replace('{{userMessage}}', chatQuery);
    
        return prompt;
    }
}