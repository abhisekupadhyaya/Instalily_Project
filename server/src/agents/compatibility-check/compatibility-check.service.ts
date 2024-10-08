import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { compatibilityCheckPrompt } from './prompt';

@Injectable()
export class CompatibilityCheckService {
    constructor(
        @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
        private intelligenceService: IntelligenceService
    ) {}

    async processCompatibilityCheck(userQuery: string, pageUrl: string) {
        const formattedPrompt = await this.formatPrompt(userQuery, pageUrl);
        return await this.intelligenceService.completeChat(formattedPrompt);
    }

    private async formatPrompt(userQuery: string, pageUrl: string): Promise<string> {
        let prompt = compatibilityCheckPrompt;
        const parsedPart = await this.parsedPartsModel.findOne({ pageUrl }).exec();
        
        let partInfo: string;
        
        if (parsedPart) {
            partInfo = `
                - Part Select Number: ${parsedPart.partSelectNumber}
                - Manufacturer Part Number: ${parsedPart.manufacturerPartNumber}
                - Manufacturer: ${parsedPart.manufacturer}
                - For Brands: ${parsedPart.forBrands}
                - Works With Products: ${parsedPart.worksWithProducts}

                Compatibility Details:
                ${parsedPart.worksWithInfo.map(item => 
                    `- Brand: ${item.brand}
                    - Model Number: ${item.modelNumber}
                    - Description: ${item.description}`).join('\n')
                }`;
        } else {
            partInfo = "No part information found for the given page URL. Please provide the user with general compatibility checking advice.";
        }
            
        prompt = prompt.replace('{partInfo}', partInfo);
        prompt = prompt.replace('{userQuery}', userQuery);

        return prompt;
    }
}