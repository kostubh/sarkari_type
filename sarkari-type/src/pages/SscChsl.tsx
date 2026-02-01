import { Link } from 'react-router-dom';

export function SscChsl() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6 flex gap-3 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/exams" className="text-blue-600 hover:text-blue-800">Exams</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">SSC CHSL</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">SSC CHSL Typing Test 2026 - Complete Guide</h1>
          <p className="text-lg text-gray-600">एसएससी सीएचएसएल टाइपिंग टेस्ट 2026 - पूरी जानकारी</p>
        </header>

        {/* Overview */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is SSC CHSL Typing Test?</h2>
          <p className="text-gray-600 mb-4">
            The SSC CHSL (Combined Higher Secondary Level) typing test is a mandatory qualifying round conducted as part of
            Tier 2 examination. It is required for posts like <strong>Lower Division Clerk (LDC)</strong>,
            <strong> Junior Secretariat Assistant (JSA)</strong>, and <strong>Postal Assistant/Sorting Assistant (PA/SA)</strong>.
            The typing test is qualifying in nature - it does not add marks to the final merit, but failing it leads to disqualification.
          </p>
          <p className="text-gray-600 mb-4">
            एसएससी सीएचएसएल (कंबाइंड हायर सेकेंडरी लेवल) टाइपिंग टेस्ट टियर 2 परीक्षा के हिस्से के रूप में आयोजित एक अनिवार्य
            क्वालिफाइंग राउंड है। यह <strong>लोअर डिवीजन क्लर्क (LDC)</strong>, <strong>जूनियर सचिवालय सहायक (JSA)</strong>,
            और <strong>पोस्टल असिस्टेंट/सॉर्टिंग असिस्टेंट (PA/SA)</strong> पदों के लिए आवश्यक है। टाइपिंग टेस्ट क्वालिफाइंग
            प्रकृति का है - यह फाइनल मेरिट में अंक नहीं जोड़ता, लेकिन इसमें फेल होने पर अयोग्यता होती है।
          </p>
        </section>

        {/* Speed Requirements */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">SSC CHSL Typing Speed Requirements / टाइपिंग स्पीड आवश्यकताएं</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600 mb-4">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Parameter</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">English Typing</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hindi Typing</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Required Speed</td>
                  <td className="py-3 px-4"><strong>35 WPM</strong></td>
                  <td className="py-3 px-4"><strong>30 WPM</strong></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Key Depressions/Hour</td>
                  <td className="py-3 px-4">10,500 KDPH</td>
                  <td className="py-3 px-4">9,000 KDPH</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Duration</td>
                  <td className="py-3 px-4">10 minutes</td>
                  <td className="py-3 px-4">10 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Duration (PwD)</td>
                  <td className="py-3 px-4">15 minutes</td>
                  <td className="py-3 px-4">15 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Max Error (General)</td>
                  <td className="py-3 px-4">7%</td>
                  <td className="py-3 px-4">7%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Max Error (OBC/SC/ST)</td>
                  <td className="py-3 px-4">10%</td>
                  <td className="py-3 px-4">10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Important Dates */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">SSC CHSL 2026 Important Dates / महत्वपूर्ण तिथियां</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mt-0.5">Expected</span>
              <span><strong>Notification:</strong> April 2026 (अधिसूचना: अप्रैल 2026)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mt-0.5">Expected</span>
              <span><strong>Tier 1 Exam:</strong> June-July 2026 (टियर 1 परीक्षा: जून-जुलाई 2026)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mt-0.5">Expected</span>
              <span><strong>Tier 2 + Typing Test:</strong> October-November 2026 (टियर 2 + टाइपिंग टेस्ट: अक्टूबर-नवंबर 2026)</span>
            </li>
          </ul>
          <p className="text-gray-500 text-sm mt-4">*Dates are based on SSC Exam Calendar 2026. Check ssc.gov.in for official updates.</p>
        </section>

        {/* Eligible Posts */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts Under SSC CHSL / एसएससी सीएचएसएल के अंतर्गत पद</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Lower Division Clerk (LDC) / अवर श्रेणी लिपिक</h3>
              <p className="text-sm text-gray-600">Pay Level 2: ₹19,900-63,200. Typing test in English or Hindi based on post preference.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Junior Secretariat Assistant (JSA) / कनिष्ठ सचिवालय सहायक</h3>
              <p className="text-sm text-gray-600">Pay Level 2: ₹19,900-63,200. Posted in various central government ministries.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Postal Assistant (PA) / डाक सहायक</h3>
              <p className="text-sm text-gray-600">Pay Level 4: ₹25,500-81,100. Typing skill essential for postal operations.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Sorting Assistant (SA) / छंटाई सहायक</h3>
              <p className="text-sm text-gray-600">Pay Level 4: ₹25,500-81,100. Works in Railway Mail Service and other sorting offices.</p>
            </div>
          </div>
        </section>

        {/* How to Prepare */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Prepare for SSC CHSL Typing Test / तैयारी कैसे करें</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-700">Start with 20 WPM, target 40+ WPM / 20 WPM से शुरू करें, 40+ WPM का लक्ष्य रखें</h3>
                <p className="text-sm">Begin at a comfortable speed and gradually increase. Aim for 5 WPM above the requirement as a safety margin.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-700">Practice with government-style passages / सरकारी शैली के पैराग्राफ से अभ्यास करें</h3>
                <p className="text-sm">SSC uses formal English passages. Practice with SarkariType's government document text source for realistic preparation.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
              <div>
                <h3 className="font-semibold text-gray-700">Keep errors below 5% / एरर 5% से कम रखें</h3>
                <p className="text-sm">The max error limit is 7% for General category. Practice maintaining below 5% for a safe margin.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
              <div>
                <h3 className="font-semibold text-gray-700">Practice daily for 10-minute sessions / रोज़ 10 मिनट के सेशन में अभ्यास करें</h3>
                <p className="text-sm">Since the actual test is 10 minutes, set SarkariType's timer to 10 minutes for exam-like practice.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs - SSC CHSL Typing Test / अक्सर पूछे जाने वाले सवाल</h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Is SSC CHSL typing test qualifying or merit-based?</summary>
              <p className="text-gray-600 mt-2 text-sm">The typing test is purely qualifying. It does not add marks to your final merit. However, you must clear it to be considered for the final selection. / टाइपिंग टेस्ट पूरी तरह से क्वालिफाइंग है। यह फाइनल मेरिट में अंक नहीं जोड़ता।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Can I choose Hindi or English for the typing test?</summary>
              <p className="text-gray-600 mt-2 text-sm">Yes, you can choose either Hindi or English at the time of application. The medium chosen cannot be changed later. / हां, आप आवेदन के समय हिंदी या अंग्रेजी चुन सकते हैं।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">What keyboard layout is used in SSC CHSL typing test?</summary>
              <p className="text-gray-600 mt-2 text-sm">For English: QWERTY keyboard. For Hindi: Remington (GAIL) keyboard layout and Mangal/Kruti Dev font are commonly used. / अंग्रेजी के लिए: QWERTY कीबोर्ड। हिंदी के लिए: रेमिंगटन (GAIL) कीबोर्ड लेआउट।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">What happens if I fail the SSC CHSL typing test?</summary>
              <p className="text-gray-600 mt-2 text-sm">If you fail the typing test, you will be disqualified from the entire selection process regardless of your Tier 1 and Tier 2 scores. There is no second chance for the same cycle. / अगर आप टाइपिंग टेस्ट में फेल हो जाते हैं, तो आपको पूरी चयन प्रक्रिया से अयोग्य घोषित कर दिया जाएगा।</p>
            </details>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-600 text-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Practice SSC CHSL Typing Test Now</h2>
          <p className="mb-1">एसएससी सीएचएसएल टाइपिंग टेस्ट का अभ्यास अभी शुरू करें</p>
          <p className="mb-4 opacity-90">Set timer to 10 minutes and target 35 WPM on SarkariType.</p>
          <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Free Typing Test
          </Link>
        </section>
      </div>
    </div>
  );
}
