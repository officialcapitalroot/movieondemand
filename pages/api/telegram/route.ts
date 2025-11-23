// app/api/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

export async function POST(request: NextRequest) {
  try {
    const update = await request.json();
    
    if (update.message) {
      await handleMessage(update.message);
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function handleMessage(message: any) {
  const chatId = message.chat.id;
  const text = message.text || '';

  if (text.startsWith('/start')) {
    const parts = text.split(' ');
    const movieSlug = parts[1] || '';
    await sendWelcomeMessage(chatId, movieSlug);
  } else if (text === '/subscribe') {
    await askForMovieLink(chatId);
  } else {
    await sendDefaultMessage(chatId);
  }
}

async function handleCallbackQuery(callbackQuery: any) {
  const chatId = callbackQuery.from.id;
  const data = callbackQuery.data;

  if (data.startsWith('movie_')) {
    const movieSlug = data.replace('movie_', '');
    await sendMovieLinks(chatId, movieSlug);
  }
}

async function sendWelcomeMessage(chatId: number, movieSlug: string) {
  const welcomeText = `🎬 *Movie On Demand Bot* 🎬

Click the button below to get your movie link:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎬 GET MOVIE LINK NOW',
          callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie'
        }
      ]
    ]
  };

  await sendTelegramMessage(chatId, welcomeText, keyboard);
}

async function askForMovieLink(chatId: number) {
  const text = `🎬 *Get Movie Link*

Click below to get your movie link:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎬 GET MOVIE LINK',
          callback_data: 'no_movie'
        }
      ]
    ]
  };

  await sendTelegramMessage(chatId, text, keyboard);
}

async function sendMovieLinks(chatId: number, movieSlug: string) {
  if (!movieSlug || movieSlug === 'no_movie') {
    const text = `❌ *No Movie Specified*

Please use the correct link from our website to get a specific movie.

Visit: ${BASE_URL}`;
    
    await sendTelegramMessage(chatId, text);
    return;
  }

  const videoLink = `${BASE_URL}/video/${movieSlug}`;

  const userText = `🎬 *Your Movie Link* 🎬

📺 *Direct Video Link:*
${videoLink}

⭐ *Website:*
${BASE_URL}

Enjoy your movie! 🍿`;

  await sendTelegramMessage(chatId, userText);
}

async function sendDefaultMessage(chatId: number) {
  const text = `🤖 *Movie On Demand Bot*

Available commands:
/start - Get movie links
/subscribe - Get access to movies`;

  await sendTelegramMessage(chatId, text);
}

async function sendTelegramMessage(chatId: any, text: string, replyMarkup?: any) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: false,
    ...(replyMarkup && { reply_markup: replyMarkup })
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Telegram API error:', result);
      return null;
    } else {
      console.log('Message sent successfully to:', chatId);
      return result.result;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return null;
  }
}