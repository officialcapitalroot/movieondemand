// // app/api/telegram/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL; // Format: @channelusername
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

// export async function POST(request: NextRequest) {
//   try {
//     const update = await request.json();
    
//     // Handle different types of updates
//     if (update.message) {
//       await handleMessage(update.message);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query);
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// async function handleMessage(message: any) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   if (text.startsWith('/start')) {
//     // Extract movie slug from start command: /start movie_slug
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';

//     await sendWelcomeMessage(chatId, movieSlug);
//   } else if (text === '/subscribe') {
//     await askForSubscription(chatId);
//   } else {
//     await sendDefaultMessage(chatId);
//   }
// }

// async function handleCallbackQuery(callbackQuery: any) {
//   const chatId = callbackQuery.message.chat.id;
//   const data = callbackQuery.data;

//   if (data === 'subscribed') {
//     await sendMovieLinks(chatId, '');
//   } else if (data === 'check_subscription') {
//     await verifySubscription(chatId);
//   }
// }

// async function sendWelcomeMessage(chatId: number, movieSlug: string) {
//   const welcomeText = `🎬 *Welcome to Movie On Demand!* 🎬

// Thank you for your interest in our movie collection! 

// To get access to your movie link, please follow these simple steps:

// 1. Join our official channel: ${TELEGRAM_CHANNEL}
// 2. Click the "I've Subscribed" button below
// 3. Get your movie link instantly!

// We appreciate your support! 🍿`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 Join Our Channel',
//           url: `https://t.me/${TELEGRAM_CHANNEL.replace('@', '')}`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'ve Subscribed',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, keyboard);
// }

// async function askForSubscription(chatId: number) {
//   const text = `🔒 *Access Required*

// To unlock movie links and enjoy our content, please subscribe to our channel first.

// Click the button below to join and then verify your subscription.`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 Join Channel & Get Link',
//           url: `https://t.me/${TELEGRAM_CHANNEL.replace('@', '')}`
//         }
//       ],
//       [
//         {
//           text: '✅ Verify Subscription',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, text, keyboard);
// }

// async function verifySubscription(chatId: number) {
//   // In a real implementation, you would check if user is actually subscribed
//   // For now, we'll assume they subscribed and send the links
//   await sendMovieLinks(chatId, '');
// }

// async function sendMovieLinks(chatId: number, movieSlug: string) {
//   // If movieSlug is provided, send specific movie link
//   // Otherwise, send general links
//   let movieLink = '';
//   let videoLink = '';

//   if (movieSlug) {
//     movieLink = `${BASE_URL}/movie/${movieSlug}`;
//     videoLink = `${BASE_URL}/video/${movieSlug}`;
//   }

//   const text = movieSlug ? 
//     `🎉 *Thank you for subscribing!* 🎉

// Here are your movie links:

// 🎬 *Movie Page:* 
// ${movieLink}

// 📺 *Direct Video Link:*
// ${videoLink}

// Enjoy your movie! 🍿

// If you have any issues, please contact support.` :
//     `🎉 *Thank you for subscribing!* 🎉

// You now have access to all our movie content!

// Visit our website to browse movies:
// ${BASE_URL}

// Enjoy your movies! 🍿`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendDefaultMessage(chatId: number) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get started with movie links
// /subscribe - Subscribe to channel and get access

// Need help? Contact our support team.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: true,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       console.error('Telegram API error:', await response.text());
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//   }
// }






// // app/api/telegram/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

// export async function POST(request: NextRequest) {
//   try {
//     const update = await request.json();
    
//     if (update.message) {
//       await handleMessage(update.message);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query);
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// async function handleMessage(message: any) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';
//     await sendWelcomeMessage(chatId, movieSlug);
//   } else if (text === '/subscribe') {
//     await askForSubscription(chatId);
//   } else {
//     await sendDefaultMessage(chatId);
//   }
// }

// async function handleCallbackQuery(callbackQuery: any) {
//   const chatId = callbackQuery.message.chat.id;
//   const data = callbackQuery.data;

//   if (data === 'subscribed') {
//     await sendMovieLinks(chatId, '');
//   } else if (data === 'check_subscription') {
//     await verifySubscription(chatId);
//   }
// }

// async function sendWelcomeMessage(chatId: number, movieSlug: string) {
//   const welcomeText = `🎬 *Welcome to Movie On Demand!* 🎬

// Thank you for your interest in our movie collection! 

// To get access to your movie link, please follow these simple steps:

// 1. Join our official channel: ${TELEGRAM_CHANNEL}
// 2. Click the "I've Subscribed" button below
// 3. Get your movie link instantly!

// We appreciate your support! 🍿`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 Join Our Channel',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'ve Subscribed',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, keyboard);
// }

// async function askForSubscription(chatId: number) {
//   const text = `🔒 *Access Required*

// To unlock movie links and enjoy our content, please subscribe to our channel first.

// Click the button below to join and then verify your subscription.`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 Join Channel & Get Link',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ Verify Subscription',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, text, keyboard);
// }

// async function verifySubscription(chatId: number) {
//   await sendMovieLinks(chatId, '');
// }

// async function sendMovieLinks(chatId: number, movieSlug: string) {
//   let movieLink = '';
//   let videoLink = '';

//   if (movieSlug) {
//     movieLink = `${BASE_URL}/movie/${movieSlug}`;
//     videoLink = `${BASE_URL}/video/${movieSlug}`;
//   }

//   const text = movieSlug ? 
//     `🎉 *Thank you for subscribing!* 🎉

// Here are your movie links:

// 🎬 *Movie Page:* 
// ${movieLink}

// 📺 *Direct Video Link:*
// ${videoLink}

// Enjoy your movie! 🍿

// If you have any issues, please contact support.` :
//     `🎉 *Thank you for subscribing!* 🎉

// You now have access to all our movie content!

// Visit our website to browse movies:
// ${BASE_URL}

// Enjoy your movies! 🍿`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendDefaultMessage(chatId: number) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get started with movie links
// /subscribe - Subscribe to channel and get access

// Need help? Contact our support team.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: true,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       console.error('Telegram API error:', await response.text());
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//   }
// }






























































// // app/api/telegram/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

// export async function POST(request: NextRequest) {
//   try {
//     const update = await request.json();
    
//     if (update.message) {
//       await handleMessage(update.message);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query);
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// async function handleMessage(message: any) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';
//     await sendWelcomeMessage(chatId, movieSlug);
//   } else if (text === '/subscribe') {
//     await askForSubscription(chatId);
//   } else {
//     await sendDefaultMessage(chatId);
//   }
// }

// async function handleCallbackQuery(callbackQuery: any) {
//   const chatId = callbackQuery.from.id;
//   const data = callbackQuery.data;

//   if (data.startsWith('movie_')) {
//     const movieSlug = data.replace('movie_', '');
//     await sendMovieLinks(chatId, movieSlug);
//   } else if (data === 'check_subscription') {
//     await verifySubscription(chatId);
//   }
// }

// async function sendWelcomeMessage(chatId: number, movieSlug: string) {
//   const welcomeText = `🎬 *Welcome to Movie On Demand!* 🎬

// To get your movie link, join our channel and click the button below:

// 📢 Channel: ${TELEGRAM_CHANNEL}
// 🎬 Movie: ${movieSlug || 'Selected Movie'}

// Click "I've Joined" after subscribing to get your link instantly!`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 JOIN OUR CHANNEL',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'VE JOINED - GET MOVIE LINK',
//           callback_data: movieSlug ? `movie_${movieSlug}` : 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, keyboard);
// }

// async function askForSubscription(chatId: number) {
//   const text = `🔒 *Access Required*

// Join our channel to unlock movie links!`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 JOIN CHANNEL',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'VE JOINED',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, text, keyboard);
// }

// async function verifySubscription(chatId: number) {
//   const text = `🎉 *Thank you for joining!* 🎉

// You now have access to all our movie content!

// Visit our website to browse movies:
// ${BASE_URL}

// Enjoy your movies! 🍿`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendMovieLinks(chatId: number, movieSlug: string) {
//   if (!movieSlug) {
//     await verifySubscription(chatId);
//     return;
//   }

//   const movieLink = `${BASE_URL}/movie/${movieSlug}`;
//   const videoLink = `${BASE_URL}/video/${movieSlug}`;

//   const text = `🎉 *Thank you for joining!* 🎉

// Here are your movie links for *${movieSlug}*:

// 🎬 *Movie Page:* 
// ${movieLink}

// 📺 *Direct Video Link:*
// ${videoLink}

// ⭐ *Website:*
// ${BASE_URL}

// Enjoy your movie! 🍿

// If you have any issues, please contact support.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendDefaultMessage(chatId: number) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get started with movie links
// /subscribe - Subscribe to channel and get access

// Need help? Contact our support team.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: false,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       console.error('Telegram API error:', await response.text());
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//   }
// }










// // app/api/telegram/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

// export async function POST(request: NextRequest) {
//   try {
//     const update = await request.json();
    
//     if (update.message) {
//       await handleMessage(update.message);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query);
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// async function handleMessage(message: any) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';
//     await sendWelcomeMessage(chatId, movieSlug);
//   } else if (text === '/subscribe') {
//     await askForSubscription(chatId);
//   } else {
//     await sendDefaultMessage(chatId);
//   }
// }

// async function handleCallbackQuery(callbackQuery: any) {
//   const chatId = callbackQuery.from.id;
//   const data = callbackQuery.data;

//   if (data.startsWith('movie_')) {
//     const movieSlug = data.replace('movie_', '');
//     await sendMovieLinks(chatId, movieSlug);
//   } else if (data === 'check_subscription') {
//     await verifySubscription(chatId);
//   }
// }

// async function sendWelcomeMessage(chatId: number, movieSlug: string) {
//   const welcomeText = `🎬 *Welcome to Movie On Demand!* 🎬

// To get your movie link, join our channel and click the button below:

// 📢 Channel: ${TELEGRAM_CHANNEL}

// Click "I've Joined" after subscribing to get your link instantly!`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 JOIN OUR CHANNEL',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'VE JOINED - GET MOVIE LINK',
//           callback_data: movieSlug ? `movie_${movieSlug}` : 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, keyboard);
// }

// async function askForSubscription(chatId: number) {
//   const text = `🔒 *Access Required*

// Join our channel to unlock movie links!`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 JOIN CHANNEL',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'VE JOINED',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, text, keyboard);
// }

// async function verifySubscription(chatId: number) {
//   const text = `🎉 *Thank you for joining!* 🎉

// You now have access to all our movie content!

// Visit our website to browse movies:
// ${BASE_URL}

// Enjoy your movies! 🍿`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendMovieLinks(chatId: number, movieSlug: string) {
//   if (!movieSlug) {
//     await verifySubscription(chatId);
//     return;
//   }

//   const videoLink = `${BASE_URL}/video/${movieSlug}`;

//   const text = `🎉 *Thank you for joining!* 🎉

// Here is your direct movie link for *${movieSlug}*:

// 📺 *Direct Video Link:*
// ${videoLink}

// ⭐ *Website:*
// ${BASE_URL}

// Enjoy your movie! 🍿

// If you have any issues, please contact support.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendDefaultMessage(chatId: number) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get started with movie links
// /subscribe - Subscribe to channel and get access

// Need help? Contact our support team.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: false,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     });

//     if (!response.ok) {
//       console.error('Telegram API error:', await response.text());
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//   }
// }











































































// // app/api/telegram/route.ts
// import { NextRequest, NextResponse } from 'next/server';

// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
// const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://movieondemand.vercel.app';

// export async function POST(request: NextRequest) {
//   try {
//     const update = await request.json();
    
//     if (update.message) {
//       await handleMessage(update.message);
//     } else if (update.callback_query) {
//       await handleCallbackQuery(update.callback_query);
//     }

//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error('Telegram webhook error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }

// async function handleMessage(message: any) {
//   const chatId = message.chat.id;
//   const text = message.text || '';

//   if (text.startsWith('/start')) {
//     const parts = text.split(' ');
//     const movieSlug = parts[1] || '';
//     await sendWelcomeMessage(chatId, movieSlug);
//   } else if (text === '/subscribe') {
//     await askForSubscription(chatId);
//   } else {
//     await sendDefaultMessage(chatId);
//   }
// }

// async function handleCallbackQuery(callbackQuery: any) {
//   const chatId = callbackQuery.from.id;
//   const data = callbackQuery.data;

//   if (data.startsWith('movie_')) {
//     const movieSlug = data.replace('movie_', '');
//     await sendMovieLinks(chatId, movieSlug);
//   } else if (data === 'check_subscription') {
//     await verifySubscription(chatId);
//   }
// }

// async function sendWelcomeMessage(chatId: number, movieSlug: string) {
//   const welcomeText = `🎬 *Welcome to Movie On Demand!* 🎬

// To get your movie link, join our channel and click the button below:

// 📢 Channel: ${TELEGRAM_CHANNEL}

// Click "I've Joined" after subscribing to get your link instantly!`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 JOIN OUR CHANNEL',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'VE JOINED - GET MOVIE LINK',
//           callback_data: movieSlug ? `movie_${movieSlug}` : 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, welcomeText, keyboard);
// }

// async function askForSubscription(chatId: number) {
//   const text = `🔒 *Access Required*

// Join our channel to unlock movie links!`;

//   const keyboard = {
//     inline_keyboard: [
//       [
//         {
//           text: '📢 JOIN CHANNEL',
//           url: `https://t.me/onlyondemand`
//         }
//       ],
//       [
//         {
//           text: '✅ I\'VE JOINED',
//           callback_data: 'check_subscription'
//         }
//       ]
//     ]
//   };

//   await sendTelegramMessage(chatId, text, keyboard);
// }

// async function verifySubscription(chatId: number) {
//   const text = `🎉 *Thank you for joining!* 🎉

// You now have access to all our movie content!

// Visit our website to browse movies:
// ${BASE_URL}

// Enjoy your movies! 🍿`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendMovieLinks(chatId: number, movieSlug: string) {
//   if (!movieSlug) {
//     await verifySubscription(chatId);
//     return;
//   }

//   const videoLink = `${BASE_URL}/video/${movieSlug}`;

//   // Send to user privately
//   const userText = `🎉 *Thank you for joining!* 🎉

// Here is your direct movie link for *${movieSlug}*:

// 📺 *Direct Video Link:*
// ${videoLink}

// ⭐ *Website:*
// ${BASE_URL}

// Enjoy your movie! 🍿

// If you have any issues, please contact support.`;

//   await sendTelegramMessage(chatId, userText);

//   // POST THE LINK IN THE CHANNEL AS A CONTROLLER BOT
//   await postMovieLinkToChannel(movieSlug, videoLink);
// }

// async function postMovieLinkToChannel(movieSlug: string, videoLink: string) {
//   const channelText = `🎬 *New Movie Available!* 🎬

// *Movie:* ${movieSlug}

// 📺 *Direct Video Link:*
// ${videoLink}

// ⭐ *Download/Watch Now:*
// ${BASE_URL}

// Enjoy! 🍿

// #Movie #Download #WatchOnline`;

//   // The controller bot posts to channel using the channel's chat ID
//   // For public channels: use @channelname
//   // For private channels: use the channel ID (negative number)
//   const channelChatId = TELEGRAM_CHANNEL.startsWith('@') ? TELEGRAM_CHANNEL : `@${TELEGRAM_CHANNEL}`;
  
//   await sendTelegramMessage(channelChatId, channelText);
// }

// async function sendDefaultMessage(chatId: number) {
//   const text = `🤖 *Movie On Demand Bot*

// Available commands:
// /start - Get started with movie links
// /subscribe - Subscribe to channel and get access

// Need help? Contact our support team.`;

//   await sendTelegramMessage(chatId, text);
// }

// async function sendTelegramMessage(chatId: any, text: string, replyMarkup?: any) {
//   const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
//   const body = {
//     chat_id: chatId,
//     text: text,
//     parse_mode: 'Markdown',
//     disable_web_page_preview: false,
//     ...(replyMarkup && { reply_markup: replyMarkup })
//   };

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
      
//       // If posting to channel fails, send error to admin
//       if (typeof chatId === 'string' && chatId.startsWith('@')) {
//         console.error(`Failed to post to channel ${chatId}. Make sure bot is admin in channel.`);
//       }
//     } else {
//       console.log('Message sent successfully to:', chatId);
//     }
//   } catch (error) {
//     console.error('Error sending Telegram message:', error);
//   }
// }











// app/api/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHANNEL = process.env.TELEGRAM_CHANNEL;
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

Click the button below to get your movie link instantly!

🔒 *Note:* Links auto-delete after 5 minutes for security`;

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

  // Send to user with auto-delete timer
  const userText = `🎬 *Your Movie Link* 🎬

📺 *Direct Video Link:*
${videoLink}

⏰ *This message will auto-delete in 5 minutes*

⭐ *Website:*
${BASE_URL}

Enjoy your movie! 🍿`;

  const sentMessage = await sendTelegramMessage(chatId, userText);
  
  // Schedule auto-delete after 5 minutes (300,000 milliseconds)
  if (sentMessage && sentMessage.message_id) {
    setTimeout(async () => {
      await deleteTelegramMessage(chatId, sentMessage.message_id);
    }, 60000); // 5 minutes  - 300000
  }
}

async function sendDefaultMessage(chatId: number) {
  const text = `🤖 *Movie On Demand Bot*

Available commands:
/start - Get movie links
/subscribe - Get access to movies

🔒 Links auto-delete after 5 minutes for security`;

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
      return result.result; // Return the message object which contains message_id
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return null;
  }
}

async function deleteTelegramMessage(chatId: any, messageId: number) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteMessage`;
  
  const body = {
    chat_id: chatId,
    message_id: messageId
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
      console.error('Telegram API error (delete):', result);
    } else {
      console.log('Message deleted successfully:', messageId);
    }
  } catch (error) {
    console.error('Error deleting Telegram message:', error);
  }
}