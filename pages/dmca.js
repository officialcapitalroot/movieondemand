import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import Footer from '../components/Footer'


export default function DMCAPage() {
  return (
    <>
      <Head>
        <title>DMCA Policy - Movie On Demand</title>
        <meta name="description" content="Digital Millennium Copyright Act Compliance Policy for Movie On Demand" />
        <meta name="keywords" content="dmca, copyright, policy, movie on demand" />
      </Head>
      
      <Header />
      <main className="min-h-screen bg-black text-white pt-20 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gray-900 rounded-lg shadow-lg p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
                DMCA Policy
              </h1>
              <p className="text-gray-400 text-lg">
                Digital Millennium Copyright Act Compliance
              </p>
            </div>

            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 mb-4">
                Movie On Demand ("we," "our," or "us") respects the intellectual property rights of others 
                and expects our users to do the same. We comply with the Digital Millennium Copyright Act ("DMCA") 
                and other applicable copyright laws.
              </p>
              <p className="text-gray-300">
                This policy outlines the procedures for submitting copyright infringement notifications 
                and how we respond to such claims.
              </p>
            </div>

            {/* Reporting Copyright Infringement */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Reporting Copyright Infringement
              </h2>
              <p className="text-gray-300 mb-4">
                If you believe that your copyrighted work has been copied in a way that constitutes 
                copyright infringement and is accessible through our service, you may notify our 
                designated copyright agent as set forth in the DMCA.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg mb-4">
                <h3 className="text-xl font-semibold text-red-500 mb-3">
                  To file a valid DMCA notice, your notification must include:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li className="ml-4">
                    <strong>Physical or electronic signature</strong> of a person authorized to act on behalf of the copyright owner
                  </li>
                  <li className="ml-4">
                    <strong>Identification</strong> of the copyrighted work claimed to have been infringed
                  </li>
                  <li className="ml-4">
                    <strong>Identification</strong> of the infringing material and information reasonably sufficient 
                    to permit us to locate the material (please provide specific URLs)
                  </li>
                  <li className="ml-4">
                    <strong>Contact information</strong> including your address, telephone number, and email address
                  </li>
                  <li className="ml-4">
                    A statement that you have a <strong>good faith belief</strong> that use of the material 
                    in the manner complained of is not authorized by the copyright owner, its agent, or the law
                  </li>
                  <li className="ml-4">
                    A statement that the information in the notification is <strong>accurate</strong>, and under penalty of perjury, 
                    that you are authorized to act on behalf of the copyright owner
                  </li>
                </ol>
              </div>
            </div>

            {/* Designated Copyright Agent */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Designated Copyright Agent
              </h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <p className="text-gray-300 mb-4">
                  Please send all DMCA notices to our designated copyright agent:
                </p>
                <div className="space-y-2 text-gray-300">
                  <p><strong>Email:</strong> dmca@movieandtvshowat.netlify.app</p>
                  <p><strong>Subject:</strong> DMCA Takedown Request</p>
                  <p className="text-sm text-gray-400 mt-4">
                    Note: Only copyright infringement notices should be sent to this email address. 
                    Other inquiries may not receive a response.
                  </p>
                </div>
              </div>
            </div>

            {/* Counter-Notification */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Counter-Notification
              </h2>
              <p className="text-gray-300 mb-4">
                If you believe that your content was removed in error, you may submit a counter-notification.
              </p>
              
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-red-500 mb-3">
                  A valid counter-notification must include:
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li className="ml-4">Your physical or electronic signature</li>
                  <li className="ml-4">Identification of the material that was removed and its location before removal</li>
                  <li className="ml-4">
                    A statement under penalty of perjury that you have a good faith belief 
                    the material was removed by mistake or misidentification
                  </li>
                  <li className="ml-4">
                    Your name, address, telephone number, and a statement consenting to the jurisdiction 
                    of your local Federal District Court, or if outside the US, to the jurisdiction of 
                    any judicial district in which the service provider may be found
                  </li>
                </ol>
              </div>
            </div>

            {/* Repeat Infringers */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Repeat Infringers
              </h2>
              <p className="text-gray-300">
                In accordance with the DMCA and other applicable laws, we have adopted a policy of terminating, 
                in appropriate circumstances and at our sole discretion, users who are deemed to be repeat infringers. 
                We may also, at our sole discretion, limit access to the service and/or terminate the accounts of 
                any users who infringe any intellectual property rights of others, whether or not there is any repeat infringement.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Disclaimer
              </h2>
              <p className="text-gray-300 mb-4">
                This DMCA policy is provided for informational purposes only and does not constitute legal advice. 
                If you are unsure whether material infringes your copyright, you should contact an attorney.
              </p>
              <p className="text-gray-300">
                We reserve the right to modify this DMCA policy at any time. Changes will be effective immediately 
                upon posting to the website.
              </p>
            </div>

            {/* Last Updated */}
            <div className="text-center border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Need More Information?
              </h3>
              <p className="text-gray-300 mb-4">
                For more information about the DMCA, please visit the 
                <a 
                  href="https://www.copyright.gov/dmca/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-400 ml-1"
                >
                  official U.S. Copyright Office website
                </a>.
              </p>
              <p className="text-gray-400 text-sm">
                This page is designed to help copyright owners and users understand our DMCA compliance procedures.
              </p>
            </div>
          </div>
        </div>
           <Footer />
      </main>
    </>
  )
}