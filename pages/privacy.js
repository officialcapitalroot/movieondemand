import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'


export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Movie On Demand</title>
        <meta name="description" content="Movie On Demand privacy policy and data protection information." />
        <meta name="keywords" content="privacy policy, data protection, movie on demand" />
      </Head>
      
      <Header />
      <main className="pt-20 min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-300">
            <p className="text-lg">Last updated: {new Date().getFullYear()}</p>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, to develop new services, and to protect our company and our users.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Sharing of Information</h2>
              <p>We do not share your personal information with third parties except as described in this policy.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Security</h2>
              <p>We take reasonable measures to help protect personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Changes to This Policy</h2>
              <p>We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at: privacy@movieondemand.com</p>
            </div>
          </div>
        </div>
           <Footer />
      </main>
    </>
  )
}