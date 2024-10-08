import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { troubleshootingPrompt } from './prompt';

@Injectable()
export class TroubleshootingService {
    constructor(
        @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
        private intelligenceService: IntelligenceService
    ) {}

    async processTroubleshootingRequest(userQuery: string, pageUrl?: string) {
        console.log("Started TS \n");
        const formattedPrompt = await this.formatPrompt(userQuery, pageUrl);
        console.log(formattedPrompt);
        return await this.intelligenceService.completeChat(formattedPrompt);
    }

    private async formatPrompt(userQuery: string, pageUrl?: string): Promise<string> {
        let prompt = troubleshootingPrompt;
        prompt = prompt.replace('{userQuery}', userQuery);
        
        if (pageUrl) {
            const parsedPart = await this.parsedPartsModel.findOne({ pageUrl }).exec();
            if (parsedPart) {
                const partInfo = `
                    Title: ${parsedPart.title}
                    PartSelect Number: ${parsedPart.partSelectNumber}
                    Manufacturer Part Number: ${parsedPart.manufacturerPartNumber}
                    Manufacturer: ${parsedPart.manufacturer}
                    Compatible Brands: ${parsedPart.forBrands}
                    Description: ${parsedPart.description}
                    Symptoms: ${parsedPart.symptoms.join(', ')}
                    Works With Products: ${parsedPart.worksWithProducts}
                    Works With Info: ${JSON.stringify(parsedPart.worksWithInfo, null, 2)}
                    Replaced Parts: ${parsedPart.replacedParts}
                `;
                
                prompt = prompt.replace('{partInfo}', partInfo);
            } else {
                prompt = prompt.replace('{partInfo}', 'No specific part information available.');
            }
        } else {
            prompt = prompt.replace('{partInfo}', 'No specific part information available.');
        }
    
        return prompt;
    }
}