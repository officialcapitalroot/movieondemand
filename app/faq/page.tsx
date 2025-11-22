'use client'

import { useState } from 'react'

export default function FAQClient() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  const faqItems = [
    {
      question: "Is Movie On Demand completely free?",
      answer: "Yes, Movie On Demand is completely free to use. We don't require any subscriptions or payments."
    },
    {
      question: "Do I need to create an account to watch movies?",
      answer: "No, you don't need to create an account. All movies are available for instant streaming without registration."
    },
    {
      question: "Why is the video buffering or not playing?",
      answer: "Buffering can be caused by slow internet connection. Try refreshing the page, lowering video quality, or check your internet speed. If problems persist, contact us on Telegram."
    },
    {
      question: "What video qualities are available?",
      answer: "We offer multiple quality options including 480p, 720p, and 1080p. The available quality depends on your internet speed and the specific movie."
    },
    {
      question: "Are subtitles available?",
      answer: "Subtitles are available for most movies. You can enable them in the video player controls if they are available for that particular movie."
    },
    {
      question: "Can I download movies to watch offline?",
      answer: "No, we currently only support streaming. Movies cannot be downloaded for offline viewing."
    },
    {
      question: "Is Movie On Demand available on mobile devices?",
      answer: "Yes, Movie On Demand works on all devices including smartphones, tablets, and computers through your web browser."
    },
    {
      question: "How often is new content added?",
      answer: "We regularly update our library with new movies and content. Check back frequently for the latest additions."
    },
    {
      question: "Why am I seeing ads?",
      answer: "We show minimal ads to support the free service. These ads help us maintain the platform and continue providing free content."
    },
    {
      question: "How can I report a problem with a movie?",
      answer: "If you encounter any issues with a movie (broken link, wrong content, etc.), please contact us directly on Telegram and we'll fix it as soon as possible."
    }
  ]

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden mb-8">
      {faqItems.map((item, index) => (
        <div key={index} className="border-b border-gray-700 last:border-b-0">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left hover:bg-gray-800 transition-colors"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold pr-4">{item.question}</h3>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          {openItems.includes(index) && (
            <div className="px-6 pb-4">
              <p className="text-gray-300">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}