import Header from '../../components/Header'
import Link from 'next/link'

export const metadata = {
  title: 'Help & Support - Movie On Demand',
  description: 'Get help with Movie On Demand. Troubleshooting guides, FAQs, and direct Telegram support.',
  keywords: 'Movie On Demand help, support, troubleshooting, telegram help',
}

export default function HelpPage() {
  const commonIssues = [
    {
      question: "Video won't play",
      answer: "Check your internet connection and try refreshing the page. If problem persists, contact us on Telegram."
    },
    {
      question: "Buffering issues",
      answer: "Try lowering the video quality or check your internet speed. We recommend at least 5Mbps for HD streaming."
    },
    {
      question: "Subtitles not working",
      answer: "Make sure subtitles are enabled in the player controls. If still not working, the video might not have subtitles."
    },
    {
      question: "Video quality is poor",
      answer: "The quality automatically adjusts based on your internet speed. You can manually select higher quality in player settings."
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-netflix-black text-white pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
              <li className="text-gray-500">/</li>
              <li className="text-gray-300">Help & Support</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Find solutions to common problems or get direct help from our team
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Quick Support Card */}
            <div className="bg-blue-900 rounded-lg p-8 mb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
              <p className="text-blue-200 mb-6">
                Contact our support team directly on Telegram for instant assistance
              </p>
              <a
                href="https://t.me/movieandtvshowat_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.78 5.42-.9 6.8-.06.67-.36.89-.89.56-2.45-1.83-3.57-2.98-5.79-4.78-.54-.45-.92-.68-.9-1.07.03-.37.46-.54.9-.39 1.55.67 4.18 2.06 4.9 2.45.54.3 1.06.14 1.22-.51.34-1.39 1.06-4.73 1.46-6.27.08-.38.22-.54.55-.54.33 0 .89.16.87.62-.02.45-.23 2.07-.45 3.63z"/>
                </svg>
                Get Help on Telegram
              </a>
            </div>

            {/* Common Issues */}
            <div className="bg-gray-900 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6">Common Issues & Solutions</h2>
              <div className="space-y-6">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="border-b border-gray-700 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-white mb-2">{issue.question}</h3>
                    <p className="text-gray-300">{issue.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Help Options */}
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/faq" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors">
                <h3 className="text-xl font-semibold mb-3">FAQ</h3>
                <p className="text-gray-300">Find answers to frequently asked questions</p>
              </Link>

              <Link href="/contact" className="bg-gray-800 hover:bg-gray-700 rounded-lg p-6 transition-colors">
                <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                <p className="text-gray-300">Get in touch with our support team</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}