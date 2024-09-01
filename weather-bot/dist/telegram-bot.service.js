"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBotService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const nestjs_telegraf_1 = require("nestjs-telegraf");
const telegraf_1 = require("telegraf");
const axios_1 = require("axios");
let TelegramBotService = class TelegramBotService {
    constructor(bot) {
        this.bot = bot;
        this.users = new Set();
    }
    onModuleInit() {
        this.bot.start((ctx) => {
            console.log('A new user has joined', ctx);
            const message = `
      Welcome! To WeatherBot
      
      I am your weather-telling bot. You can use the following commands:
      
      /subscribe - Subscribe to hourly weather notifications.
      /unsubscribe - Unsubscribe from notifications.
      /help - Show available commands.
      /about - Learn more about the developer.
      /status - Check your block-unblock and subscribe-unsubscribe status.
      
      Once subscribed, you’ll receive weather updates every hour. Stay informed with the latest weather conditions!
      `;
            ctx.reply(message);
        });
        this.bot.hears('/subscribe', async (ctx) => {
            const response = await axios_1.default.post(`${process.env.LocalApi}/api/subscribe`, {
                userId: ctx.chat.id,
            });
            ctx.reply(`${response.data.message}`);
        });
        this.bot.hears('/unsubscribe', async (ctx) => {
            const response = await axios_1.default.post(`${process.env.LocalApi}/api/unsubscribe`, {
                userId: ctx.chat.id,
            });
            console.log('🚀 ~ TelegramBotService ~ this.bot.hears ~ response:', response);
            ctx.reply(`${response.data.message}`);
        });
        this.bot.hears('/help', async (ctx) => {
            ctx.reply('These are the supported commands:');
            ctx.reply('/subscribe - Subscribe to hourly weather notifications.');
            ctx.reply('/unsubscribe - Unsubscribe from notifications.');
            ctx.reply('/about - Learn more about the developer.');
            ctx.reply('/status - Check your block-unblock and subscribe-unsubscribe status.');
        });
        this.bot.hears('/about', async (ctx) => {
            ctx.reply('WeatherBot is developed by Gaurav Gol.');
            ctx.reply('Contact: gauravgol34@gmail.com');
            ctx.reply('GitHub: https://github.com/Gauravgol');
            ctx.reply('portfolio: https://gauravgol.netlify.app/');
        });
        this.bot.hears('/status', async (ctx) => {
            try {
                const response = await axios_1.default.post(`${process.env.LocalApi}/api/status`, {
                    userId: ctx.chat.id,
                });
                if (response.data.data.isSubscribed) {
                    ctx.reply(`You are subscribed`);
                }
                if (!response.data.data.isSubscribed) {
                    ctx.reply(`You are Not subscribed`);
                }
                if (response.data.data.isBlocked) {
                    ctx.reply(` your are blocked by admin`);
                }
                if (!response.data.data.isBlocked) {
                }
            }
            catch (error) {
                console.log('🚀 ~ TelegramBotService ~ this.bot.hears ~ error:', error);
                ctx.reply(`Server is down please try again later`);
            }
        });
        this.bot.on('text', (ctx) => {
            const message = `
      I did not understand that command. Please use one of the following:
      /subscribe - Subscribe to hourly weather notifications.
      /unsubscribe - Unsubscribe from notifications.
      /help - Show available commands.
      /about - Learn more about the developer.
        `;
            ctx.reply(message);
        });
        this.bot.hears('stop', (ctx) => {
            ctx.reply('Bot is stopping...');
            this.stopBot();
        });
        this.bot
            .launch()
            .then(() => console.log('Bot started!'))
            .catch((err) => console.error('Failed to launch bot:', err));
        process.once('SIGINT', () => this.bot.stop('SIGINT'));
        process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
    }
    stopBot() {
        try {
            this.bot.stop('SIGINT');
            console.log('Bot stopped gracefully');
        }
        catch (err) {
            console.error('Failed to stop bot:', err);
        }
    }
    async sendDailyWeatherUpdates() {
        try {
            const response = await axios_1.default.get(`${process.env.LocalApi}/api/get-subscribers`);
            if (response.data.status === true && response.data.data.length > 0) {
                const weatherData = await this.getWeatherData();
                console.log('subsribes', response.data.data);
                if (response.data.data.length > 0) {
                    for (const data of response.data.data) {
                        this.bot.telegram.sendMessage(data.userid, `Hello this hour weather Report: ${weatherData}`);
                    }
                }
            }
        }
        catch (error) {
            console.log('🚀 ~ TelegramBotService ~ sendDailyWeatherUpdates ~ error:', error);
        }
    }
    async getWeatherData() {
        try {
            const response = await axios_1.default.get('https://open-weather13.p.rapidapi.com/city/Noida/EN', {
                headers: {
                    'x-rapidapi-key': `${process.env.WeatherApi}`,
                    'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
                },
            });
            const { main, weather } = response.data;
            const tempInCelsius = ((main.temp - 32) * 5) / 9;
            console.log(`Temperature: ${tempInCelsius.toFixed(2)}°C, Weather: ${weather[0]?.description}, Humidity: ${main.humidity}`);
            return `Temperature: ${tempInCelsius.toFixed(2)}°C, Weather: ${weather[0].description}, Humidity: ${main.humidity}`;
        }
        catch (error) {
            console.log('🚀 ~ TelegramBotService ~ getWeatherData ~ error:', error);
            return `Server is down!! Unable to get response `;
        }
    }
};
exports.TelegramBotService = TelegramBotService;
__decorate([
    (0, schedule_1.Cron)('*/1 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TelegramBotService.prototype, "sendDailyWeatherUpdates", null);
exports.TelegramBotService = TelegramBotService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_telegraf_1.InjectBot)()),
    __metadata("design:paramtypes", [telegraf_1.Telegraf])
], TelegramBotService);
//# sourceMappingURL=telegram-bot.service.js.map