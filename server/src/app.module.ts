import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AgentsModule } from './agents/agents.module';
import { MongooseModule } from '@nestjs/mongoose';
import { WebpageHistoryModule } from './webpage-history/webpage-history.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27017/instalilyDB',
      }),
      inject: [ConfigService],
    }),
    ApiModule,
    AgentsModule,
    WebpageHistoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}