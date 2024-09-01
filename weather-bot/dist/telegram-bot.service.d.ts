import { OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
export declare class TelegramBotService implements OnModuleInit {
    private readonly bot;
    private readonly users;
    constructor(bot: Telegraf<any>);
    onModuleInit(): void;
    private stopBot;
    sendDailyWeatherUpdates(): Promise<void>;
    private getWeatherData;
}
