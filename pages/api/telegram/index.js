// // pages/api/telegram/index.js
// export default async function handler(req, res) {
//   // Only allow POST requests
//   if (req.method !== 'POST') {
//     console.log('Method not allowed:', req.method);
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

//   console.log('Webhook received request');
//   console.log('Token exists:', !!TELEGRAM_BOT_TOKEN);

//   try {
//     const update = req.body;
//     console.log('Update received:', JSON.stringify(update, null, 2));
    
//     if (update.message) {
//       await handleMessage(update.message, TELEGRAM_BOT_TOKEN, BASE_URL);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query, TELEGRAM_BOT_TOKEN, BASE_URL);
//     }

//     res.status(200).json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// async function handleMessage(message, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   console.log(`Processing message from ${chatId}: ${text}`);

//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';
//     await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
//   } else {
//     await sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
//   }
// }

// async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const chatId = callbackQuery.from.id;
//   const data = callbackQuery.data;

//   console.log(`Processing callback from ${chatId}: ${data}`);

//   if (data.startsWith('movie_')) {
//     const movieSlug = data.replace('movie_', '');
//     await sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
//   }
// }

// async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const welcomeText = `🎬 *Movie On Demand Bot* 🎬

// Click the button below to get your movie link:`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '🎬 GET MOVIE LINK NOW 🎬',
//           callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
// }

// async function sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   if (!movieSlug || movieSlug === 'no_movie') {
//     const text = `❌ *No Movie Specified*

// Please use the correct link from our website to get a specific movie.

// Visit: ${BASE_URL}`;
    
//     await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
//     return;
//   }

//   const movieLink = `${BASE_URL}/movie/${movieSlug}`;

//   const userText = `🎬 *Your Movie Link* 🎬

// 📺 *Movie Page:*
// ${movieLink}

// ⭐ *Website:*
// ${BASE_URL}

// Enjoy your movie! 🍿`;

//   await sendTelegramMessage(chatId, userText, TELEGRAM_BOT_TOKEN);
// }

// async function sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get movie links`;

//   await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
// }

// async function sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: false,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

//   console.log('Sending message to Telegram API...');

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     const result = await response.json();
    
//     if (!response.ok) {
//       console.error('Telegram API error:', result);
//       return null;
//     } else {
//       console.log('Message sent successfully to:', chatId);
//       return result.result;
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//     return null;
//   }
// }


























// // pages/api/telegram/index.js
// export default async function handler(req, res) {
//   // Only allow POST requests
//   if (req.method !== 'POST') {
//     console.log('Method not allowed:', req.method);
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

//   console.log('Webhook received request');
//   console.log('Token exists:', !!TELEGRAM_BOT_TOKEN);

//   try {
//     const update = req.body;
//     console.log('Update received:', JSON.stringify(update, null, 2));
    
//     if (update.message) {
//       await handleMessage(update.message, TELEGRAM_BOT_TOKEN, BASE_URL);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query, TELEGRAM_BOT_TOKEN, BASE_URL);
//     }

//     res.status(200).json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// async function handleMessage(message, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   console.log(`Processing message from ${chatId}: ${text}`);

//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';
//     await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
//   } else {
//     await sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
//   }
// }

// async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const chatId = callbackQuery.from.id;
//   const data = callbackQuery.data;

//   console.log(`Processing callback from ${chatId}: ${data}`);

//   if (data.startsWith('movie_')) {
//     const movieSlug = data.replace('movie_', '');
//     await sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
//   }
// }

// async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const welcomeText = `🎬 *Movie On Demand Bot* 🎬

// Click the button below to get your movie link:`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '🎬 GET MOVIE LINK NOW 🎬',
//           callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
// }

// async function sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   if (!movieSlug || movieSlug === 'no_movie') {
//     const text = `❌ *No Movie Specified*

// Please use the correct link from our website to get a specific movie.

// Visit: ${BASE_URL}`;
    
//     await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
//     return;
//   }

//   const videoLink = `${BASE_URL}/video/${movieSlug}`;

//   const userText = `🎬 *Your Movie Link* 🎬

// 📺 *Direct Video Link:*
// ${videoLink}

// ⭐ *Website:*
// ${BASE_URL}

// Enjoy your movie! 🍿`;

//   await sendTelegramMessage(chatId, userText, TELEGRAM_BOT_TOKEN);
// }

// async function sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get movie links`;

//   await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
// }

// async function sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: false,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

//   console.log('Sending message to Telegram API...');

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     const result = await response.json();
    
//     if (!response.ok) {
//       console.error('Telegram API error:', result);
//       return null;
//     } else {
//       console.log('Message sent successfully to:', chatId);
//       return result.result;
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//     return null;
//   }
// }












// pages/api/telegram/index.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = '8536675678:AAEXTQXv1j7G-PngUFK-nFK9SFIpRQWI1TU';
  const BASE_URL = 'https://movieondemand.vercel.app';

  console.log('=== WEBHOOK RECEIVED ===');
  console.log('Token:', TELEGRAM_BOT_TOKEN ? 'SET' : 'MISSING');

  try {
    const update = req.body;
    console.log('Update:', JSON.stringify(update, null, 2));
    
    if (update.message) {
      await handleMessage(update.message, TELEGRAM_BOT_TOKEN, BASE_URL);
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query, TELEGRAM_BOT_TOKEN, BASE_URL);
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleMessage(message, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = message.chat.id;
  const text = message.text || '';

  console.log(`Message from ${chatId}: ${text}`);

  if (text.startsWith('/start')) {
    const parts = text.split(' ');
    const movieSlug = parts[1] || '';
    await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
  } else {
    await sendTelegramMessage(chatId, 'Send /start to begin', TELEGRAM_BOT_TOKEN);
  }
}

async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = callbackQuery.from.id;
  const data = callbackQuery.data;

  console.log(`Callback from ${chatId}: ${data}`);

  if (data.startsWith('movie_')) {
    const movieSlug = data.replace('movie_', '');
    const videoLink = `${BASE_URL}/video/${movieSlug}`;
    await sendTelegramMessage(chatId, `🎬 Your movie link: ${videoLink}`, TELEGRAM_BOT_TOKEN);
  }
}

async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const welcomeText = `🎬 *Movie On Demand Bot* 🎬\n\nClick below to get your movie link:`;
  
  const keyboard = {
    inline_keyboard: [[
      { text: '🎬 GET MOVIE LINK 🎬', callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie' }
    ]]
  };

  await sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
}

async function sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup) {
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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const result = await response.json();
    console.log('Send message result:', result.ok ? 'SUCCESS' : 'FAILED');
    return result;
  } catch (error) {
    console.error('Send message error:', error);
    return null;
  }
}