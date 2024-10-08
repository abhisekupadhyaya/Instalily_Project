import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstallationHelpService } from './installation-help.service';
import { ParsedParts, ParsedPartsSchema } from '../../webpage-history/parsed-parts.schema';
import { IntelligenceModule } from '../../intelligence/intelligence.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ParsedParts.name, schema: ParsedPartsSchema }]),
    IntelligenceModule
  ],
  providers: [InstallationHelpService],
  exports: [InstallationHelpService]
})
export class InstallationHelpModule {}