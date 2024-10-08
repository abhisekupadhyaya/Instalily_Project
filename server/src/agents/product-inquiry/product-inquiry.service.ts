import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { ProductInquiryPrompt } from './prompt';

@Injectable()
export class ProductInquiryService {
    constructor(
        @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
        private intelligenceService: IntelligenceService
    ) {}

    async processProductInquiry(chatQuery: string, pageUrl: string) {
        const formattedPrompt = await this.formatPrompt(chatQuery, pageUrl);
        return await this.intelligenceService.completeChat(formattedPrompt);
    }

    private async formatPrompt(chatQuery: string, pageUrl: string): Promise<string> {
        let prompt = ProductInquiryPrompt;
        const parsedPart = await this.parsedPartsModel.findOne({ pageUrl }).exec();
    
        let partInfo = '';
        if (parsedPart) {
            const details = [
                { label: 'Title', value: parsedPart.title },
                { label: 'Part Select Number', value: parsedPart.partSelectNumber },
                { label: 'Manufacturer Part Number', value: parsedPart.manufacturerPartNumber },
                { label: 'Manufacturer', value: parsedPart.manufacturer },
                { label: 'For Brands', value: parsedPart.forBrands },
                { label: 'Description', value: parsedPart.description },
                { label: 'Symptoms', value: parsedPart.symptoms.join(', ') },
                { label: 'Works With Products', value: parsedPart.worksWithProducts },
                { label: 'Works With Info', value: JSON.stringify(parsedPart.worksWithInfo) },
                { label: 'Replaced Parts', value: parsedPart.replacedParts }
            ];
    
            partInfo += details
                .filter(detail => detail.value)
                .map(detail => `- ${detail.label}: ${detail.value}`)
                .join('\n');
        } else {
            partInfo += 'Information not available';
        }
    
        prompt = prompt.replace('{{partInfo}}', partInfo);
        prompt = prompt.replace('{{userMessage}}', chatQuery);
    
        return prompt;
    }
}