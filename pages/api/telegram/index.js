// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   // Use environment variables for security
//   const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
//   const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

//   // Security: Validate environment variables
//   if (!TELEGRAM_BOT_TOKEN) {
//     console.error('TELEGRAM_BOT_TOKEN environment variable is missing');
//     return res.status(500).json({ error: 'Server configuration error' });
//   }

//   console.log('=== WEBHOOK RECEIVED ===');

//   try {
//     const update = req.body;
//     console.log('Update:', JSON.stringify(update, null, 2));
    
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

//   // Extract movie slug from /start command if present
//   let movieSlug = '';
//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     movieSlug = parts[1] || '';
//   }

//   // AUTO-SEND WELCOME MESSAGE WHEN USER OPENS CHAT
//   await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
// }

// async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const chatId = callbackQuery.from.id;
//   const data = callbackQuery.data;

//   console.log(`Processing callback from ${chatId}: ${data}`);

//   await answerCallbackQuery(callbackQuery.id, TELEGRAM_BOT_TOKEN);

//   if (data.startsWith('movie_')) {
//     const movieSlug = data.replace('movie_', '');
//     // Security: Validate movie slug format (alphanumeric and hyphens only)
//     if (/^[a-zA-Z0-9-]+$/.test(movieSlug)) {
//       await sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
//     } else {
//       await sendErrorMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
//     }
//   } else if (data === 'no_movie') {
//     await sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
//   }
// }

// async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const welcomeText = `🎬 *Movie On Demand Bot* 🎬

// Get instant access to movie links directly in Telegram!

// Click below to get started:`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '🎬 GET MOVIE LINK 🎬',
//           callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie'
//         }
//       ],
//       [
//         {
//           text: '🌐 VISIT WEBSITE',
//           url: BASE_URL
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
// }

// async function sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   if (!movieSlug || movieSlug === 'no_movie') {
//     await sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
//     return;
//   }

//   const videoLink = `${BASE_URL}/video/${movieSlug}`;
  
//   // Assuming you have thumbnail images in this path pattern
//   const thumbnailUrl = `${BASE_URL}/thumbnails/${movieSlug}.jpg`;

//   const userText = `🎬 *Movie Link Ready!* 🎬

// 📺 *Direct Video Link:*
// ${videoLink}

// ⭐ *Website:*
// ${BASE_URL}

// Enjoy your movie! 🍿`;

//   // First try to send with thumbnail, if fails send without
//   try {
//     await sendTelegramPhoto(chatId, thumbnailUrl, userText, TELEGRAM_BOT_TOKEN);
//   } catch (error) {
//     console.log('Failed to send photo, sending text only');
//     // Disable web page preview to remove OG image
//     await sendTelegramMessage(chatId, userText, TELEGRAM_BOT_TOKEN, null, true);
//   }
// }

// async function sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const text = `📺 *Browse Movies*

// Visit our website to find movies and get direct links:

// ${BASE_URL}

// Click "Get Telegram Link" on any movie page to get the direct video link here!`;
  
//   // Disable web page preview to remove OG image
//   await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, null, true);
// }

// async function sendErrorMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
//   const text = `❌ *Invalid Request*

// Please use the website to get valid movie links:

// ${BASE_URL}`;
  
//   // Disable web page preview to remove OG image
//   await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, null, true);
// }

// async function sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup, disablePreview = true) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: disablePreview, // This disables OG image preview
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

// async function sendTelegramPhoto(chatId, photoUrl, caption, TELEGRAM_BOT_TOKEN) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
  
//   const body = {
//     chat_id: chatId,
//     photo: photoUrl,
//     caption: caption,
//     parse_mode: 'Markdown'
//   };

//   console.log('Sending photo to Telegram API...');

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
//       console.error('Telegram API photo error:', result);
//       throw new Error('Photo send failed');
//     } else {
//       console.log('Photo sent successfully to:', chatId);
//       return result.result;
//     }
//   } catch (error) {
//     console.error('Error sending Telegram photo:', error);
//     throw error;
//   }
// }

// async function answerCallbackQuery(callbackQueryId, TELEGRAM_BOT_TOKEN) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/answerCallbackQuery`;
  
//   const body = {
//     callback_query_id: callbackQueryId
//   };

//   try {
//     await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });
//   } catch (error) {
//     console.error('Error answering callback query:', error);
//   }
// }


















export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Use environment variables for security
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

  // Security: Validate environment variables
  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN environment variable is missing');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  console.log('=== WEBHOOK RECEIVED ===');

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
    console.error('Telegram webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleMessage(message, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = message.chat.id;
  const text = message.text || '';

  console.log(`Processing message from ${chatId}: ${text}`);

  // Extract movie slug from /start command if present
  let movieSlug = '';
  if (text.startsWith('/start')) {
    const parts = text.split(' ');
    movieSlug = parts[1] || '';
  }

  // AUTO-SEND WELCOME MESSAGE WHEN USER OPENS CHAT
  await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
}

async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = callbackQuery.from.id;
  const data = callbackQuery.data;

  console.log(`Processing callback from ${chatId}: ${data}`);

  await answerCallbackQuery(callbackQuery.id, TELEGRAM_BOT_TOKEN);

  if (data.startsWith('movie_')) {
    const movieSlug = data.replace('movie_', '');
    // Security: Validate movie slug format (alphanumeric and hyphens only)
    if (/^[a-zA-Z0-9-]+$/.test(movieSlug)) {
      await sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
    } else {
      await sendErrorMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
    }
  } else if (data === 'no_movie') {
    await sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
  }
}

async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const welcomeText = `🎬 *Movie On Demand Bot* 🎬

Get instant access to movie links directly in Telegram!

Click below to get started:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎬 GET MOVIE LINK 🎬',
          callback_data: movieSlug ? `movie_${movieSlug}` : 'no_movie'
        }
      ],
      [
        {
          text: '🌐 VISIT WEBSITE',
          url: BASE_URL
        }
      ]
    ]
  };

  await sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
}

async function sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
  if (!movieSlug || movieSlug === 'no_movie') {
    await sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL);
    return;
  }

  const videoLink = `${BASE_URL}/video/${movieSlug}`;
  
  // Multiple thumbnail URL patterns to try
  const thumbnailUrls = [
    `${BASE_URL}/thumbnails/${movieSlug}.jpg`,
    `${BASE_URL}/thumbnails/${movieSlug}.png`,
    `${BASE_URL}/thumbnails/${movieSlug}.webp`,
    `${BASE_URL}/images/${movieSlug}.jpg`,
    `${BASE_URL}/images/${movieSlug}.png`,
    `${BASE_URL}/posters/${movieSlug}.jpg`,
    `${BASE_URL}/api/thumbnail/${movieSlug}`
  ];

  const userText = `🎬 *Movie Link Ready!* 🎬

📺 *Direct Video Link:*
${videoLink}

⭐ *Website:*
${BASE_URL}

Enjoy your movie! 🍿`;

  // Create keyboard with buttons that open in new tabs
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🎬 WATCH MOVIE (DIRECT LINK) 🎬',
          url: videoLink
        }
      ],
      [
        {
          text: '🌐 VISIT WEBSITE',
          url: BASE_URL
        }
      ],
      [
        {
          text: '🔍 BROWSE MORE MOVIES',
          url: `${BASE_URL}/movies`
        }
      ]
    ]
  };

  // Try to find and send a working thumbnail
  let thumbnailSent = false;
  
  for (const thumbnailUrl of thumbnailUrls) {
    try {
      console.log(`Trying thumbnail: ${thumbnailUrl}`);
      await sendTelegramPhoto(chatId, thumbnailUrl, userText, TELEGRAM_BOT_TOKEN, keyboard);
      thumbnailSent = true;
      console.log(`Successfully sent thumbnail: ${thumbnailUrl}`);
      break; // Stop if successful
    } catch (error) {
      console.log(`Failed to send thumbnail ${thumbnailUrl}:`, error.message);
      continue; // Try next thumbnail
    }
  }

  // If no thumbnails worked, send text message with buttons
  if (!thumbnailSent) {
    console.log('All thumbnails failed, sending text message with buttons');
    await sendTelegramMessage(chatId, userText, TELEGRAM_BOT_TOKEN, keyboard, true);
  }
}

async function sendNoMovieMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const text = `📺 *Browse Movies*

Visit our website to find movies and get direct links:

${BASE_URL}

Click "Get Telegram Link" on any movie page to get the direct video link here!`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🌐 VISIT WEBSITE TO FIND MOVIES',
          url: BASE_URL
        }
      ],
      [
        {
          text: '🔍 BROWSE ALL MOVIES',
          url: `${BASE_URL}/movies`
        }
      ]
    ]
  };
  
  await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, keyboard, true);
}

async function sendErrorMessage(chatId, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const text = `❌ *Invalid Request*

Please use the website to get valid movie links:

${BASE_URL}`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: '🌐 VISIT WEBSITE',
          url: BASE_URL
        }
      ]
    ]
  };
  
  await sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, keyboard, true);
}

async function sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN, replyMarkup, disablePreview = true) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: disablePreview,
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
      throw new Error(`Telegram API error: ${result.description || 'Unknown error'}`);
    } else {
      console.log('Message sent successfully to:', chatId);
      return result.result;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    throw error;
  }
}

async function sendTelegramPhoto(chatId, photoUrl, caption, TELEGRAM_BOT_TOKEN, replyMarkup = null) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`;
  
  const body = {
    chat_id: chatId,
    photo: photoUrl,
    caption: caption,
    parse_mode: 'Markdown',
    ...(replyMarkup && { reply_markup: replyMarkup })
  };

  console.log('Sending photo to Telegram API...');

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
      console.error('Telegram API photo error:', result);
      throw new Error(`Photo send failed: ${result.description || 'Unknown error'}`);
    } else {
      console.log('Photo sent successfully to:', chatId);
      return result.result;
    }
  } catch (error) {
    console.error('Error sending Telegram photo:', error);
    throw error;
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
      console.error('Error answering callback query:', await response.text());
    } else {
      console.log('Callback query answered successfully');
    }
  } catch (error) {
    console.error('Error answering callback query:', error);
  }
}




















