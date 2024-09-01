import { Module, OnModuleInit } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TelegrafModule } from 'nestjs-telegraf';
 
import { TelegramBotService } from './telegram-bot.service';
import { ConfigModule } from '@nestjs/config';
 
@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
    }),
    
  ],
  providers: [TelegramBotService],
})
export class AppModule {}