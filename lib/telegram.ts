// // lib/telegram.ts
// export async function setTelegramWebhook() {
//   const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
//   const WEBHOOK_URL = process.env.NEXT_PUBLIC_BASE_URL + '/api/telegram';

//   if (!TELEGRAM_BOT_TOKEN) {
//     console.error('TELEGRAM_BOT_TOKEN is not set');
//     return;
//   }

//   try {
//     const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`;
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         url: WEBHOOK_URL,
//         drop_pending_updates: true,
//       }),
//     });

//     const data = await response.json();
    
//     if (data.ok) {
//       console.log('Telegram webhook set successfully');
//     } else {
//       console.error('Failed to set webhook:', data);
//     }
//   } catch (error) {
//     console.error('Error setting webhook:', error);
//   }
// }






// lib/telegram.ts
export async function setTelegramWebhook() {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const WEBHOOK_URL = process.env.NEXT_PUBLIC_BASE_URL + '/api/telegram';

  if (!TELEGRAM_BOT_TOKEN) {
    console.error('TELEGRAM_BOT_TOKEN is not set');
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        drop_pending_updates: true,
      }),
    });

    const data = await response.json();
    
    if (data.ok) {
      console.log('Telegram webhook set successfully');
    } else {
      console.error('Failed to set webhook:', data);
    }
  } catch (error) {
    console.error('Error setting webhook:', error);
  }
}