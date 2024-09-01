import { Injectable, OnModuleInit } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import axios from 'axios';

@Injectable()
export class TelegramBotService implements OnModuleInit {
  private readonly users: Set<number> = new Set();

  constructor(@InjectBot() private readonly bot: Telegraf<any>) {}

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

    // Handle subscribe command
    this.bot.hears('/subscribe', async (ctx) => {
      const response = await axios.post(
        `${process.env.LocalApi}/api/subscribe`,
        {
          userId: ctx.chat.id,
        },
      );
      ctx.reply(`${response.data.message}`);
    });

    this.bot.hears('/unsubscribe', async (ctx) => {
      const response = await axios.post(
        `${process.env.LocalApi}/api/unsubscribe`,
        {
          userId: ctx.chat.id,
        },
      );
      console.log(
        '🚀 ~ TelegramBotService ~ this.bot.hears ~ response:',
        response,
      );
      ctx.reply(`${response.data.message}`);
    });

    this.bot.hears('/help', async (ctx) => {
      ctx.reply('These are the supported commands:');
      ctx.reply('/subscribe - Subscribe to hourly weather notifications.');
      ctx.reply('/unsubscribe - Unsubscribe from notifications.');
      ctx.reply('/about - Learn more about the developer.');
      ctx.reply('/status - Check your block-unblock and subscribe-unsubscribe status.')
    });

    this.bot.hears('/about', async (ctx) => {
      ctx.reply('WeatherBot is developed by Gaurav Gol.');
      ctx.reply('Contact: gauravgol34@gmail.com');
      ctx.reply('GitHub: https://github.com/Gauravgol');
      ctx.reply('portfolio: https://gauravgol.netlify.app/');
    });

    this.bot.hears('/status', async (ctx) => {
      try {
        const response = await axios.post(
          `${process.env.LocalApi}/api/status`,
          {
            userId: ctx.chat.id,
          },
        );
       if(response.data.data.isSubscribed){
        ctx.reply(`You are subscribed`)
       }      
       if(!response.data.data.isSubscribed){
        ctx.reply(`You are Not subscribed`)
       }  
       if(response.data.data.isBlocked){
        ctx.reply(` your are blocked by admin`);
       }
       if(!response.data.data.isBlocked){
       
       }
        
      } catch (error) {
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
    // Launch the bot
    this.bot
      .launch()
      .then(() => console.log('Bot started!'))
      .catch((err) => console.error('Failed to launch bot:', err));

    // Handle graceful shutdown
    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
  private stopBot() {
    try {
      this.bot.stop('SIGINT');
      console.log('Bot stopped gracefully');
    } catch (err) {
      console.error('Failed to stop bot:', err);
    }
  }
  // @Cron(CronExpression.EVERY_DAY_AT_8AM)
  // async sendDailyWeatherUpdates() {

  //   const response = await axios.get(`${process.env.LocalApi}/api/get-subscribers`);
  //   const weatherData = await this.getWeatherData();

  //   for (const data of response.data.data) {
  //     this.bot.telegram.sendMessage(data.userid, `Hello this hour weather Report: ${weatherData}`);
  //   }
  // }

  @Cron('*/1 * * * *')
  async sendDailyWeatherUpdates() {
    try {
      const response = await axios.get(
        `${process.env.LocalApi}/api/get-subscribers`,
      );
      if (response.data.status === true && response.data.data.length > 0) {
        const weatherData = await this.getWeatherData();
        console.log('subsribes', response.data.data);
        if (response.data.data.length > 0) {
          for (const data of response.data.data) {
            this.bot.telegram.sendMessage(
              data.userid,
              `Weather Report: ${weatherData}`,
            );
          }
        }
      }
    } catch (error) {
      console.log(
        '🚀 ~ TelegramBotService ~ sendDailyWeatherUpdates ~ error:',
        error,
      );
    }
  }

  private async getWeatherData(): Promise<string> {
    // Replace with your actual weather API request
    try {
      const response = await axios.get(
        'https://open-weather13.p.rapidapi.com/city/Noida/EN',
        {
          headers: {
            'x-rapidapi-key':
              `${process.env.WeatherApi}`,
            'x-rapidapi-host': 'open-weather13.p.rapidapi.com',
          },
        },
      );  

      const { main, weather } = response.data;
      const tempInCelsius = ((main.temp - 32) * 5) / 9;
      console.log(
        `Temperature: ${tempInCelsius.toFixed(2)}°C, Weather: ${weather[0]?.description}, Humidity: ${main.humidity}`,
      );
      return `Temperature: ${tempInCelsius.toFixed(2)}°C, Weather: ${weather[0].description}, Humidity: ${main.humidity}`;
    } catch (error) {
      console.log('🚀 ~ TelegramBotService ~ getWeatherData ~ error:', error);
      return `Server is down!! Unable to get response `;
    }
  }
}
