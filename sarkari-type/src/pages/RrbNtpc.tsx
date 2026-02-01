import { Link } from 'react-router-dom';

export function RrbNtpc() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6 flex gap-3 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/exams" className="text-blue-600 hover:text-blue-800">Exams</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">RRB NTPC</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">RRB NTPC Typing Test 2026 - Complete Guide</h1>
          <p className="text-lg text-gray-600">आरआरबी एनटीपीसी टाइपिंग टेस्ट 2026 - पूरी जानकारी</p>
        </header>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is RRB NTPC Typing Test?</h2>
          <p className="text-gray-600 mb-4">
            The RRB NTPC (Non-Technical Popular Categories) exam includes a Computer Based Typing Skill Test (CBTST)
            for specific posts that require typing proficiency. This test is conducted for clerical and administrative
            positions in Indian Railways such as <strong>Junior Clerk cum Typist</strong>, <strong>Accounts Clerk cum Typist</strong>,
            <strong> Junior Time Keeper</strong>, and <strong>Commercial Apprentice</strong>.
          </p>
          <p className="text-gray-600">
            आरआरबी एनटीपीसी (नॉन-टेक्निकल पॉपुलर कैटेगरीज) परीक्षा में विशिष्ट पदों के लिए कंप्यूटर आधारित टाइपिंग कौशल
            परीक्षा (CBTST) शामिल है। यह परीक्षा भारतीय रेलवे में लिपिक और प्रशासनिक पदों जैसे <strong>जूनियर क्लर्क कम
            टाइपिस्ट</strong>, <strong>अकाउंट्स क्लर्क कम टाइपिस्ट</strong> के लिए आयोजित की जाती है।
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">RRB NTPC Typing Requirements / टाइपिंग आवश्यकताएं</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Parameter</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">English</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hindi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Required Speed</td>
                  <td className="py-3 px-4"><strong>30 WPM</strong></td>
                  <td className="py-3 px-4"><strong>25 WPM</strong></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Duration</td>
                  <td className="py-3 px-4">10 minutes</td>
                  <td className="py-3 px-4">10 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Nature</td>
                  <td className="py-3 px-4">Qualifying</td>
                  <td className="py-3 px-4">Qualifying</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Keyboard Layout</td>
                  <td className="py-3 px-4">QWERTY</td>
                  <td className="py-3 px-4">Remington (GAIL)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts Requiring Typing Test / टाइपिंग टेस्ट वाले पद</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Junior Clerk cum Typist / जूनियर क्लर्क कम टाइपिस्ट</h3>
              <p className="text-sm text-gray-600">Pay Level 2: ₹19,900-63,200. Handles clerical work and typing in railway offices.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Accounts Clerk cum Typist / लेखा लिपिक कम टाइपिस्ट</h3>
              <p className="text-sm text-gray-600">Pay Level 2: ₹19,900-63,200. Maintains accounts and types financial documents.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Commercial Apprentice / वाणिज्य अपरेंटिस</h3>
              <p className="text-sm text-gray-600">Pay Level 6: ₹35,400-1,12,400. Handles commercial operations at railway stations.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Traffic Assistant / यातायात सहायक</h3>
              <p className="text-sm text-gray-600">Pay Level 4: ₹25,500-81,100. Manages train traffic and scheduling operations.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">RRB NTPC 2026 Exam Calendar / परीक्षा कैलेंडर</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mt-0.5">Scheduled</span>
              <span><strong>NTPC UG CBTST (Typing Test):</strong> February 13, 2026</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mt-0.5">Expected</span>
              <span><strong>NTPC Graduate Level CBT:</strong> As per RRB Calendar 2026-27</span>
            </li>
          </ul>
          <p className="text-gray-500 text-sm mt-4">*Based on RRB Calendar 2026. Check respective RRB website for zone-wise dates.</p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">RRB NTPC Selection Process / चयन प्रक्रिया</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-700">CBT 1 (Computer Based Test - Stage 1) / प्रथम चरण</h3>
                <p className="text-sm">Screening test with General Awareness, Mathematics, and Reasoning. 100 questions, 90 minutes.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-700">CBT 2 (Computer Based Test - Stage 2) / द्वितीय चरण</h3>
                <p className="text-sm">Main exam with General Awareness, Mathematics, and Reasoning. 120 questions, 90 minutes.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
              <div>
                <h3 className="font-semibold text-gray-700">CBTST (Typing Skill Test) / टाइपिंग कौशल परीक्षा</h3>
                <p className="text-sm">Qualifying typing test. 30 WPM English or 25 WPM Hindi in 10 minutes. <strong>This is where SarkariType helps you!</strong></p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
              <div>
                <h3 className="font-semibold text-gray-700">Document Verification / दस्तावेज़ सत्यापन</h3>
                <p className="text-sm">Final stage with original document verification and medical examination.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs / अक्सर पूछे जाने वाले सवाल</h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Is the typing test required for all RRB NTPC posts?</summary>
              <p className="text-gray-600 mt-2 text-sm">No, the typing test (CBTST) is only for specific posts like Junior Clerk cum Typist and Accounts Clerk cum Typist. Posts like Station Master and Goods Guard do not require a typing test. / नहीं, टाइपिंग टेस्ट केवल विशिष्ट पदों के लिए है।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Can I choose Hindi or English for RRB NTPC typing test?</summary>
              <p className="text-gray-600 mt-2 text-sm">Yes, you can choose either Hindi or English based on the post requirement and your preference indicated during application. / हां, आप आवेदन के दौरान अपनी पसंद के आधार पर हिंदी या अंग्रेजी चुन सकते हैं।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">What is the difference between RRB NTPC Graduate and Undergraduate typing test?</summary>
              <p className="text-gray-600 mt-2 text-sm">Both have similar typing speed requirements (30 WPM English / 25 WPM Hindi). The difference is in the educational qualification and the posts available. Graduate level has more senior positions. / दोनों में समान टाइपिंग स्पीड आवश्यकताएं हैं।</p>
            </details>
          </div>
        </section>

        <section className="text-center bg-blue-600 text-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Practice RRB NTPC Typing Test Now</h2>
          <p className="mb-1">आरआरबी एनटीपीसी टाइपिंग टेस्ट का अभ्यास अभी शुरू करें</p>
          <p className="mb-4 opacity-90">Set timer to 10 minutes and target 30 WPM on SarkariType.</p>
          <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Free Typing Test
          </Link>
        </section>
      </div>
    </div>
  );
}
