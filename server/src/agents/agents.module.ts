import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { QueryModule } from './query/query.module';
import { QueryIntentModule } from './query-intent/query-intent.module';
import { ProductInquiryModule } from './product-inquiry/product-inquiry.module';
import { CompatibilityCheckModule } from './compatibility-check/compatibility-check.module';
import { InstallationHelpModule } from './installation-help/installation-help.module';
import { TroubleshootingModule } from './troubleshooting/troubleshooting.module';
import { BrandInquiryModule } from './brand-inquiry/brand-inquiry.module';
import { SmallTalkModule } from './small-talk/small-talk.module';

@Module({
  imports: [QueryModule, QueryIntentModule, ProductInquiryModule, CompatibilityCheckModule, InstallationHelpModule, TroubleshootingModule, BrandInquiryModule, SmallTalkModule],
  providers: [AgentsService],
  exports: [AgentsService]
})
export class AgentsModule {}