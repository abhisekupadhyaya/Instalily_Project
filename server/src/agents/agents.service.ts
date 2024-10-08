import { Injectable } from '@nestjs/common';
import { QueryService } from './query/query.service';
import { QueryIntentService } from './query-intent/query-intent.service';
import { SmallTalkService } from './small-talk/small-talk.service';
import { ProductInquiryService } from './product-inquiry/product-inquiry.service';
import { CompatibilityCheckService } from './compatibility-check/compatibility-check.service';
import { InstallationHelpService } from './installation-help/installation-help.service';
import { TroubleshootingService } from './troubleshooting/troubleshooting.service';
import { BrandInquiryService } from './brand-inquiry/brand-inquiry.service';

@Injectable()
export class AgentsService {
  constructor(
    private queryService: QueryService,
    private queryIntentService: QueryIntentService,
    private smallTalkService: SmallTalkService,
    private productInquiryService: ProductInquiryService,
    private compatibilityCheckService: CompatibilityCheckService,
    private installationHelpService: InstallationHelpService,
    private troubleshootingService: TroubleshootingService,
    private brandInquiryService: BrandInquiryService,
  ) {}

  async completeChat(chatId: string, chatQuery: string) {
    try {
      const userIntent = await this.queryIntentService.classifyUserIntent(chatQuery);
      const parsedIntent = JSON.parse(userIntent);
  
      const userQueryResult = await this.queryService.processUserQuery(chatId, chatQuery);
      if (!userQueryResult.success) {
        throw new Error(userQueryResult.message);
      }
      const pageUrl = userQueryResult.pageUrl;
  
      let ollamaResponse;
      switch (parsedIntent.intent) {
        case 'PRODUCT_INQUIRY':
          ollamaResponse = await this.productInquiryService.processProductInquiry(chatQuery, pageUrl);
          break;
        case 'COMPATIBILITY_CHECK':
          ollamaResponse = await this.compatibilityCheckService.processCompatibilityCheck(chatQuery, pageUrl);
          break;
        case 'INSTALLATION_HELP':
          ollamaResponse = await this.installationHelpService.processInstallationHelpRequest(chatQuery, pageUrl);
          break;
        case 'TROUBLESHOOTING':
          ollamaResponse = await this.troubleshootingService.processTroubleshootingRequest(chatQuery, pageUrl);
          break;
        case 'BRAND_INQUIRY':
          ollamaResponse = await this.brandInquiryService.processBrandInquiry(chatQuery, pageUrl);
          break;
        case 'SMALL_TALK':
          ollamaResponse = await this.smallTalkService.processSmallTalkRequest(chatQuery, pageUrl);
          break;
        default:
          throw new Error(`Unknown intent: ${parsedIntent.intent}`);
      }
  
      const response = await this.queryService.processIntelligenceResponse(chatId, ollamaResponse);
      return response;
    } catch (error) {
      console.error('Error in completeChat:', error);
      throw error;
    }
  }

  createChat(chatId: string, pageUrl: string) {
    return this.queryService.createChat(chatId, pageUrl);
  }
}