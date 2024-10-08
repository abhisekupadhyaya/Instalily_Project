import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { brandInquiryPrompt } from './prompt';

@Injectable()
export class BrandInquiryService {
    constructor(
        @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
        private intelligenceService: IntelligenceService
    ) {}

    async processBrandInquiry(userQuery: string, pageUrl?: string) {
        const formattedPrompt = await this.formatPrompt(userQuery, pageUrl);
        return await this.intelligenceService.completeChat(formattedPrompt);
    }

    private async formatPrompt(userQuery: string, pageUrl?: string): Promise<string> {
        let prompt = brandInquiryPrompt;
        let productInfo = '';

        if (pageUrl) {
            const parsedPart = await this.parsedPartsModel.findOne({ pageUrl }).exec();
            if (parsedPart) {
                productInfo = this.formatProductInfo(parsedPart);
            } else {
                productInfo = 'No product information available for the given URL.';
            }
        } else {
            productInfo = 'No specific product information provided.';
        }

        prompt = prompt.replace('{productInfo}', productInfo);
        prompt = prompt.replace('{userMessage}', userQuery);
        return prompt;
    }

    private formatProductInfo(parsedPart: ParsedPartsDocument): string {
        const info = [
            `- Title: ${parsedPart.title}`,
            `- Manufacturer: ${parsedPart.manufacturer}`,
            `- For Brands: ${parsedPart.forBrands}`,
            `- Part Select Number: ${parsedPart.partSelectNumber}`,
            `- Manufacturer Part Number: ${parsedPart.manufacturerPartNumber}`,
            `- Description: ${parsedPart.description}`,
            `- Works With Products: ${parsedPart.worksWithProducts}`,
            '\nWorks With Information:',
            ...parsedPart.worksWithInfo.map(item => 
                `- Brand: ${item.brand}, Model Number: ${item.modelNumber}, Description: ${item.description}`
            )
        ];

        return info.join('\n');
    }
}