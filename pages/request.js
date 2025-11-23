import Head from 'next/head'
import Header from '../components/Header'
import { Send } from 'lucide-react'
import Footer from '../components/Footer'

export default function RequestPage() {
  return (
    <>
      <Head>
        <title>Request a Movie - Movie On Demand</title>
        <meta name="description" content="Request any movie you want to watch. We'll add it within 24 hours via Telegram." />
      </Head>
      <Header />
      <main className="pt-20 min-h-screen bg-black">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Request a Movie
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Can't find the movie you're looking for? Request it through Telegram and we'll add it within 24 hours!
            </p>
            
            <div className="bg-gray-800 p-8 rounded-lg mb-8">
              <p className="text-lg mb-6 text-white">
                <strong>Requested movies will be uploaded within 24 hours.</strong>
              </p>
              
              <a
                href="https://t.me/onlyondemand"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition text-lg font-semibold"
              >
                <Send className="mr-3" size={24} />
                Request via Telegram
              </a>
            </div>

            <div className="text-gray-400">
              <p className="mb-2">📱 Send your movie request through our Telegram bot</p>
              <p className="mb-2">⏰ We process requests within 24 hours</p>
              <p>🎬 New movies added daily to our library</p>
            </div>
          </div>
        </div>
         <Footer />
      </main>
    </>
  )
}