// lib/init-telegram.ts
import { setTelegramWebhook } from './telegram';

export async function initializeTelegramBot() {
  if (process.env.NODE_ENV === 'production') {
    await setTelegramWebhook();
  }
}

// Call this in your app initialization
initializeTelegramBot().catch(console.error);