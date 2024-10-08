import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParsedParts, ParsedPartsDocument } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceService } from '../../intelligence/intelligence.service';
import { installationHelpPrompt } from './prompt';

@Injectable()
export class InstallationHelpService {
    constructor(
        @InjectModel(ParsedParts.name) private parsedPartsModel: Model<ParsedPartsDocument>,
        private intelligenceService: IntelligenceService
    ) {}

    async processInstallationHelpRequest(chatQuery: string, pageUrl: string) {
        const formattedPrompt = await this.formatPrompt(chatQuery, pageUrl);
        return await this.intelligenceService.completeChat(formattedPrompt);
    }

    private async formatPrompt(chatQuery: string, pageUrl: string): Promise<string> {
        let prompt = installationHelpPrompt;
        
        const parsedPart = await this.parsedPartsModel.findOne({ pageUrl }).exec();
        if (parsedPart) {
            const replacements = {
                '{title}': parsedPart.title,
                '{partSelectNumber}': parsedPart.partSelectNumber,
                '{manufacturerPartNumber}': parsedPart.manufacturerPartNumber,
                '{manufacturer}': parsedPart.manufacturer,
                '{forBrands}': parsedPart.forBrands,
                '{description}': parsedPart.description,
                '{symptoms}': parsedPart.symptoms.join(', '),
                '{worksWithProducts}': parsedPart.worksWithProducts,
                '{replacedParts}': parsedPart.replacedParts,
                '{userQuery}': chatQuery
            };
            
            for (const [placeholder, value] of Object.entries(replacements)) {
                prompt = prompt.replace(new RegExp(placeholder, 'g'), value || 'N/A');
            }
        } else {
            console.warn(`No parsed part found for pageUrl: ${pageUrl}`);
            prompt = `No specific part information found. How can I assist you with your installation query: ${chatQuery}`;
        }
    
        return prompt;
    }
}