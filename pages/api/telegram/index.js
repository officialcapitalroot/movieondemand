// pages/api/telegram/index.js

export const config = {
  api: {
    bodyParser: false, // REQUIRED FOR TELEGRAM WEBHOOK
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Parse raw Telegram body
    const rawBody = await readRawBody(req);
    const update = JSON.parse(rawBody.toString());

    console.log("Telegram Update:", update);

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const BASE_URL =
      process.env.NEXT_PUBLIC_BASE_URL || "https://movieondemand.vercel.app";

    if (update.message) {
      await handleMessage(update.message, TOKEN, BASE_URL);
    }

    if (update.callback_query) {
      await handleCallback(update.callback_query, TOKEN, BASE_URL);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({ error: "Internal Error" });
  }
}

/* ---------------- RAW BODY READER (MANDATORY) ---------------- */

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = [];
    req.on("data", chunk => data.push(chunk));
    req.on("end", () => resolve(Buffer.concat(data)));
    req.on("error", err => reject(err));
  });
}

/* ---------------- MESSAGE HANDLER ---------------- */

async function handleMessage(msg, TOKEN, BASE_URL) {
  const chatId = msg.chat.id;
  const text = msg.text || "";

  if (text.startsWith("/start")) {
    const parts = text.split(" ");
    const movieSlug = parts[1] || "";
    return sendWelcome(chatId, movieSlug, TOKEN);
  }

  return sendDefault(chatId, TOKEN);
}

/* ---------------- CALLBACK HANDLER ---------------- */

async function handleCallback(query, TOKEN, BASE_URL) {
  const chatId = query.from.id;
  const data = query.data;

  if (data.startsWith("movie_")) {
    const slug = data.replace("movie_", "");
    return sendMovie(chatId, slug, TOKEN, BASE_URL);
  }
}

/* ---------------- SEND WELCOME ---------------- */

async function sendWelcome(chatId, slug, TOKEN) {
  const text = `🎬 *Movie On Demand Bot* 🎬

Click the button below to get your movie link:`;

  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "🎬 GET MOVIE LINK NOW 🎬",
          callback_data: slug ? `movie_${slug}` : "no_movie",
        },
      ],
    ],
  };

  return sendMessage(chatId, text, TOKEN, keyboard);
}

/* ---------------- SEND MOVIE LINK ---------------- */

async function sendMovie(chatId, slug, TOKEN, BASE_URL) {
  if (!slug || slug === "no_movie") {
    return sendMessage(
      chatId,
      `❌ No movie selected.\nVisit: ${BASE_URL}`,
      TOKEN
    );
  }

  const videoURL = `${BASE_URL}/video/${slug}`;

  const msg = `🎬 *Your Movie Link* 🎬

📺 Direct Video:
${videoURL}

⭐ Website:
${BASE_URL}

🍿 Enjoy your movie!`;

  return sendMessage(chatId, msg, TOKEN);
}

/* ---------------- DEFAULT MESSAGE ---------------- */

async function sendDefault(chatId, TOKEN) {
  return sendMessage(
    chatId,
    `🤖 *Movie On Demand Bot*\n\nUse /start to get movie links.`,
    TOKEN
  );
}

/* ---------------- TELEGRAM SEND MESSAGE ---------------- */

async function sendMessage(chatId, text, TOKEN, replyMarkup = null) {
  const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const body = {
    chat_id: chatId,
    text,
    parse_mode: "Markdown",
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const json = await res.json();
    console.log("Telegram Response:", json);
    return json;
  } catch (err) {
    console.error("Error sending message:", err);
  }
}
