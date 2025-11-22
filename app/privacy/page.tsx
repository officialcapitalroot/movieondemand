// app/privacy/page.tsx
import Header from '../../components/Header'

export const metadata = {
  title: 'Privacy Policy - Movie On Demand',
  description: 'Movie On Demand privacy policy and data protection information.',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-netflix-black">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p>Last updated: {new Date().getFullYear()}</p>

            <h2>Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, to develop new services, and to protect our company and our users.</p>

            <h2>Sharing of Information</h2>
            <p>We do not share your personal information with third parties except as described in this policy.</p>

            <h2>Security</h2>
            <p>We take reasonable measures to help protect personal information from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>

            <h2>Changes to This Policy</h2>
            <p>We may change this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.</p>

            <h2>Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at: privacy@Movie On Demand.com</p>
          </div>
        </div>
      </main>
    </>
  )
}