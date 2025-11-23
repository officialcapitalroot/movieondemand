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

export const config = {
  api: {
    bodyParser: false, // IMPORTANT: Telegram webhook requires raw body
  },
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    console.log("Method not allowed:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Read raw body because Telegram sends JSON as raw bytes
  const rawBody = await getRawBody(req);
  let update;

  try {
    update = JSON.parse(rawBody.toString());
  } catch (err) {
    console.error("Invalid JSON from Telegram:", err);
    return res.status(400).json({ error: "Bad Request" });
  }

  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://movieondemand.vercel.app";

  console.log("Webhook triggered:", update);

  try {
    if (update.message) {
      await handleMessage(update.message, TELEGRAM_BOT_TOKEN, BASE_URL);
    } else if (update.callback_query) {
      await handleCallbackQuery(update.callback_query, TELEGRAM_BOT_TOKEN, BASE_URL);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// ------------- RAW BODY PARSER (IMPORTANT FOR TELEGRAM) -------------
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = [];

    req.on("data", chunk => data.push(chunk));
    req.on("end", () => resolve(Buffer.concat(data)));
    req.on("error", err => reject(err));
  });
}

// ------------- MESSAGE HANDLER ----------------
async function handleMessage(message, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = message.chat.id;
  const text = message.text || "";

  console.log("Incoming message:", text);

  if (text.startsWith("/start")) {
    const parts = text.split(" ");
    const movieSlug = parts[1] || "";
    await sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN);
  } else {
    await sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN);
  }
}

// ------------- CALLBACK HANDLER ----------------
async function handleCallbackQuery(callbackQuery, TELEGRAM_BOT_TOKEN, BASE_URL) {
  const chatId = callbackQuery.from.id;
  const data = callbackQuery.data;

  console.log("Callback query:", data);

  if (data.startsWith("movie_")) {
    const movieSlug = data.replace("movie_", "");
    await sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL);
  }
}

// ------------- SEND WELCOME -------------
async function sendWelcomeMessage(chatId, movieSlug, TELEGRAM_BOT_TOKEN) {
  const welcomeText = `🎬 *Movie On Demand Bot* 🎬

Click the button below to get your movie link:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "🎬 GET MOVIE LINK NOW 🎬",
          callback_data: movieSlug ? `movie_${movieSlug}` : "no_movie",
        },
      ],
    ],
  };

  return sendTelegramMessage(chatId, welcomeText, TELEGRAM_BOT_TOKEN, keyboard);
}

// ------------- SEND MOVIE LINKS -------------
async function sendMovieLinks(chatId, movieSlug, TELEGRAM_BOT_TOKEN, BASE_URL) {
  if (!movieSlug || movieSlug === "no_movie") {
    return sendTelegramMessage(
      chatId,
      `❌ *No Movie Specified*

Visit: ${BASE_URL}`,
      TELEGRAM_BOT_TOKEN
    );
  }

  const videoLink = `${BASE_URL}/video/${movieSlug}`;

  const msg = `🎬 *Your Movie Link* 🎬

📺 *Direct Video Link:*  
${videoLink}

⭐ *Website:*  
${BASE_URL}

🍿 Enjoy your movie!`;

  return sendTelegramMessage(chatId, msg, TELEGRAM_BOT_TOKEN);
}

// ------------- DEFAULT MESSAGE -------------
async function sendDefaultMessage(chatId, TELEGRAM_BOT_TOKEN) {
  const text = `🤖 *Movie On Demand Bot*

Available commands:  
/start - Get movie links`;

  return sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN);
}

// ------------- SEND TELEGRAM MESSAGE -------------
async function sendTelegramMessage(chatId, text, token, replyMarkup) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const body = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    ...(replyMarkup && { reply_markup: replyMarkup }),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    console.log("Telegram response:", json);

    return json;
  } catch (err) {
    console.error("Error sending Telegram message:", err);
  }
}
