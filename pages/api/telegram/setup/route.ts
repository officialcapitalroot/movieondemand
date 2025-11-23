// // app/api/telegram/setup/route.ts
// import { NextResponse } from 'next/server';
// import { setTelegramWebhook } from '../../../../lib/telegram';

// export async function GET() {
//   try {
//     await setTelegramWebhook();
//     return NextResponse.json({ message: 'Webhook setup initiated' });
//   } catch (error) {
//     return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
//   }
// }





// app/api/telegram/setup/route.ts
import { NextResponse } from 'next/server';
import { setTelegramWebhook } from '../../../../lib/telegram';

export async function GET() {
  try {
    await setTelegramWebhook();
    return NextResponse.json({ message: 'Webhook setup initiated' });
  } catch (error) {
    return NextResponse.json({ error: 'Setup failed' }, { status: 500 });
  }
}