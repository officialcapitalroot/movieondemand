// app/terms/page.tsx
import Header from '../../components/Header'

export const metadata = {
  title: 'Terms of Service - Movie On Demand',
  description: 'Movie On Demand terms of service and user agreement.',
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-netflix-black">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-invert max-w-none">
            <p>Last updated: {new Date().getFullYear()}</p>

            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2>2. Use License</h2>
            <p>Permission is granted to temporarily view the materials on this website for personal, non-commercial transitory viewing only.</p>

            <h2>3. Disclaimer</h2>
            <p>The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

            <h2>4. Limitations</h2>
            <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website.</p>

            <h2>5. Revisions and Errata</h2>
            <p>The materials appearing on this website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete, or current.</p>

            <h2>6. Links</h2>
            <p>We have not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.</p>

            <h2>7. Modifications</h2>
            <p>We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>

            <h2>8. Governing Law</h2>
            <p>Any claim relating to this website shall be governed by the laws of the State of California without regard to its conflict of law provisions.</p>
          </div>
        </div>
      </main>
    </>
  )
}