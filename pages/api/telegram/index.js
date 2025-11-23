export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = '8536675678:AAEXTQXv1j7G-PngUFK-nFK9SFIpRQWI1TU';
  const BASE_URL = 'https://movieondemand.vercel.app';

  console.log('=== WEBHOOK RECEIVED ===');

  try {
    const update = req.body;
    console.log('Full update:', JSON.stringify(update, null, 2));
    
    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text || '';
      
      console.log(`Processing message from ${chatId}: ${text}`);
      
      // EXTRACT MOVIE SLUG FROM /start COMMAND OR ANY MESSAGE
      let movieSlug = '';
      if (text.startsWith('/start')) {
        const parts = text.split(' ');
        movieSlug = parts[1] || '';
      }
      
      // SEND DIRECT MOVIE LINK IMMEDIATELY - NO BUTTONS NEEDED
      if (movieSlug) {
        // IF MOVIE SLUG PROVIDED, SEND DIRECT VIDEO LINK
        const videoLink = `${BASE_URL}/video/${movieSlug}`;
        const directLinkText = `🎬 *MOVIE LINK READY!* 🎬

📺 *DIRECT VIDEO LINK:*
${videoLink}

⭐ *Website:*
${BASE_URL}

Enjoy your movie! 🍿`;

        await sendTelegramMessage(chatId, directLinkText, TELEGRAM_BOT_TOKEN);
      } else {
        // IF NO MOVIE SLUG, SEND WEBSITE LINK
        const noMovieText = `🎬 *MOVIE ON DEMAND BOT* 🎬

Visit our website to get movie links:
${BASE_URL}

Go to any movie page and click "Get Telegram Link" to receive the direct video link here!`;

        await sendTelegramMessage(chatId, noMovieText, TELEGRAM_BOT_TOKEN);
      }
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function sendTelegramMessage(chatId, text, TELEGRAM_BOT_TOKEN) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: false
  };

  console.log('SENDING DIRECT MESSAGE TO USER:', text);

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
      console.log('DIRECT MESSAGE SENT SUCCESSFULLY to:', chatId);
      return result.result;
    }
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return null;
  }
}