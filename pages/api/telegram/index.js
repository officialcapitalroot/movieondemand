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

/**
 * Main handler for the Telegram Bot Webhook.
 * It processes incoming updates from Telegram.
 */
export default async function handler(req, res) {
  // 1. Validate Environment Variables
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

  if (!TELEGRAM_BOT_TOKEN) {
    console.error('CRITICAL: TELEGRAM_BOT_TOKEN is not defined in environment variables.');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  // 2. Only allow POST requests from Telegram
  if (req.method !== 'POST') {
    console.warn(`Method not allowed: ${req.method}`);
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  console.log('Webhook received a POST request.');

  // 3. Process the incoming update
  try {
    const update = req.body;
    console.log('Update received:', JSON.stringify(update, null, 2));

    if (update.message) {
      await handleMessage(update.message, TELEGRAM_BOT_TOKEN, BASE_URL);
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query, TELEGRAM_BOT_TOKEN, BASE_URL);
    } else {
      console.log('Received an update that is not a message or callback query.');
    }

    // 4. Send a success response to Telegram
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error processing Telegram webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Handles incoming text messages.
 */
async function handleMessage(message, token, baseUrl) {
  const chatId = message.chat.id;
  const text = message.text || '';

  console.log(`Processing message from chat ${chatId}: "${text}"`);

  if (text.startsWith('/start')) {
    // Extract movie slug if provided (e.g., /start my-awesome-movie)
    const movieSlug = text.split(' ')[1] || '';
    await sendWelcomeMessage(chatId, movieSlug, token, baseUrl);
  } else {
    // Handle any other message
    await sendDefaultMessage(chatId, token, baseUrl);
  }
}

/**
 * Handles button clicks (callback queries).
 */
async function handleCallbackQuery(callbackQuery, token, baseUrl) {
  const chatId = callbackQuery.from.id;
  const data = callbackQuery.data;
  const callbackQueryId = callbackQuery.id;

  console.log(`Processing callback query from chat ${chatId} with data: "${data}"`);

  // IMPORTANT: Acknowledge the button click immediately to remove the "loading" state.
  await answerCallbackQuery(callbackQueryId, token);

  if (data.startsWith('movie_')) {
    const movieSlug = data.replace('movie_', '');
    await sendMovieLinks(chatId, movieSlug, token, baseUrl);
  } else {
    console.warn(`Unhandled callback data: ${data}`);
  }
}

/**
 * Sends the initial welcome message with a button.
 */
async function sendWelcomeMessage(chatId, movieSlug, token, baseUrl) {
  const welcomeText = `🎬 *Movie On Demand Bot* 🎬\n\nClick the button below to get your movie link:`;
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎬 GET MOVIE LINK NOW 🎬',
          callback_data: movieSlug ? `movie_${movieSlug}` : 'movie_no_movie' // Ensure consistent prefix
        }
      ]
    ]
  };
  await sendTelegramMessage(chatId, welcomeText, token, { reply_markup: keyboard });
}

/**
 * Sends the movie link to the user.
 */
async function sendMovieLinks(chatId, movieSlug, token, baseUrl) {
  if (!movieSlug || movieSlug === 'no_movie') {
    const text = `❌ *No Movie Specified*\n\nPlease get a specific movie link from our website first.\n\nVisit: ${baseUrl}`;
    await sendTelegramMessage(chatId, text, token);
    return;
  }

  const videoLink = `${baseUrl}/video/${movieSlug}`;
  const userText = `🎬 *Your Movie Link is Ready!* 🎬\n\n📺 *Direct Video Link:*\n${videoLink}\n\n⭐ *Our Website:*\n${baseUrl}\n\nEnjoy your movie! 🍿`;
  await sendTelegramMessage(chatId, text, token);
}

/**
 * Sends a default message for unrecognized commands.
 */
async function sendDefaultMessage(chatId, token, baseUrl) {
  const text = `🤖 *Movie On Demand Bot*\n\nPlease visit our website to select a movie. When you click the Telegram button on the site, I will send you the link!\n\n${baseUrl}`;
  await sendTelegramMessage(chatId, text, token);
}

// --- TELEGRAM API HELPER FUNCTIONS ---

/**
 * A generic function to send a message to the Telegram API.
 */
async function sendTelegramMessage(chatId, text, token, options = {}) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: false,
    ...options
  };

  console.log('Sending message to Telegram:', JSON.stringify(body));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();
    if (!result.ok) {
      console.error('Telegram API Error:', result.description);
    } else {
      console.log('Message sent successfully to chat:', chatId);
    }
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}

/**
 * Acknowledges a callback query. This stops the loading icon on the user's button.
 */
async function answerCallbackQuery(callbackQueryId, token) {
  const url = `https://api.telegram.org/bot${token}/answerCallbackQuery`;
  const body = { callback_query_id: callbackQueryId };

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log(`Acknowledged callback query: ${callbackQueryId}`);
  } catch (error) {
    console.error('Failed to answer callback query:', error);
  }
}