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
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

  // Check if token exists
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is not set');
    return res.status(500).json({ error: 'Bot token not configured' });
  }

  console.log('Webhook received request');
  console.log('Token exists:', !!TELEGRAM_BOT_TOKEN);

  try {
    const update = req.body;
    console.log('Update received:', JSON.stringify(update, null, 2));
    
    // Process update asynchronously without blocking response
    processUpdate(update, TELEGRAM_BOT_TOKEN, BASE_URL).catch(error => {
      console.error('Error processing update:', error);
    });

    // Respond immediately to Telegram
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Process update asynchronously
async function processUpdate(update, TELEGRAM_BOT_TOKEN, BASE_URL) {
  if (update.message) {
    await handleMessage(update.message, TELEGRAM_BOT_TOKEN, BASE_URL);
  } else if (update.callback_query) {
    await handleCallbackQuery(update.callback_query, TELEGRAM_BOT_TOKEN, BASE_URL);
  }
}

async function handleMessage(message, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = message.chat.id;
  const text = message.text || '';

  console.log(`Processing message from ${chatId}: ${text}`);

  if (text.startsWith('/start')) {
    const parts = text.split(' ');
    const movieSlug = parts[1] || '';
    await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
  } else if (text.startsWith('/help')) {
    await sendHelpMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
  } else {
    await sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
  }
}

async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = callbackQuery.from.id;
  const messageId = callbackQuery.message?.message_id;
  const data = callbackQuery.data;

  console.log(`Processing callback from ${chatId}: ${data}`);

  // Answer callback query first
  await answerCallbackQuery(callbackQuery.id, TELEGRAM_BOT_TOKEN);

  if (data.startsWith('movie_')) {
    const movieSlug = data.replace('movie_', '');
    await sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL, messageId);
  } else if (data === 'no_movie') {
    await sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL, messageId);
  }
}

async function answerCallbackQuery(callbackQueryId, TELEGRAM_BOT_TOKEN) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`;
  
  const body = {
    callback_query_id: callbackQueryId
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Failed to answer callback query');
    }
  } catch (error) {
    console.error('Error answering callback query:', error);
  }
}

async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const welcomeText = `🎬 *Welcome to Movie On Demand Bot* 🎬

${movieSlug ? 'Click the button below to get your movie link:' : 'Use this bot to get direct movie links from our website!'}`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎬 GET MOVIE LINK NOW 🎬',
          callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie'
        }
      ],
      [
        {
          text: '🌐 Visit Website',
          url: BASE_URL
        },
        {
          text: '📞 Support',
          url: 'https://t.me/movieandtvshowondemand'
        }
      ]
    ]
  };

  await sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
}

async function sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL, messageId) {
  if (!movieSlug || movieSlug === 'no_movie') {
    await sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL, messageId);
    return;
  }

  const movieLink = `${BASE_URL}/movie/${movieSlug}`;

  const userText = `🎬 *Your Movie Link* 🎬

📺 *Movie Page:*
${movieLink}

⭐ *Website:*
${BASE_URL}

🎥 *How to watch:*
1. Click the movie page link above
2. Find the video player on the page
3. Click play and enjoy!

If you have any issues, contact our support.

Enjoy your movie! 🍿`;

  // If we have messageId, edit the existing message, otherwise send new
  if (messageId) {
    await editTelegramMessage(chatId, messageId, userText, TELEGRAM_BOT_TOKEN);
  } else {
    await sendTelegramMessage(chatId, userText, TELEGRAM_BOT_TOKEN);
  }
}

async function sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL, messageId) {
  const text = `❌ *No Movie Specified*

Please use the correct link from our website to get a specific movie.

Visit our website and click on any movie, then use the "Request Movie" button to get the direct link.

🌐 *Website:* ${BASE_URL}

If you need help, contact our support.`;

  if (messageId) {
    await editTelegramMessage(chatId, messageId, text, TELEGRAM_BOT_TOKEN);
  } else {
    await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
  }
}

async function sendHelpMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const text = `🤖 *Movie On Demand Bot Help*

*Available commands:*
/start - Start the bot and get movie links
/help - Show this help message

*How to use:*
1. Visit our website: ${BASE_URL}
2. Find the movie you want to watch
3. Click the "Request Movie" button
4. You'll be redirected to this bot with the movie link
5. Click the button to get your direct movie link

*Need help?*
Contact our support: @movieandtvshowondemand`;

  await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
}

async function sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const text = `🤖 *Movie On Demand Bot*

I'm here to help you get direct movie links from our website!

*Available commands:*
/start - Get started with the bot
/help - Show help information

Visit our website to browse movies: ${BASE_URL}`;

  await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
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

  console.log('Sending message to Telegram API...');

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
      throw new Error(`Telegram API error: ${result.description}`);
    } else {
      console.log('Message sent successfully to:', chatId);
      return result.result;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

async function editTelegramMessage(chatId, messageId, text, TELEGRAM_BOT_TOKEN, replyMarkup) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`;
  
  const body = {
    chat_id: chatId,
    message_id: messageId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: false,
    ...(replyMarkup && { reply_markup: replyMarkup })
  };

  console.log('Editing Telegram message...');

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
      console.error('Telegram API edit error:', result);
      // If editing fails, send as new message
      await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup);
    } else {
      console.log('Message edited successfully for:', chatId);
      return result.result;
    }
  } catch (error) {
    console.error('Error editing Telegram message:', error);
    // If editing fails, send as new message
    await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup);
  }
}