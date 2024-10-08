import { Module } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';

@Module({
  providers: [IntelligenceService],
  exports: [IntelligenceService], // Add this line if you want to use the service in other modules
})
export class IntelligenceModule {}