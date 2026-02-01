import { Link } from 'react-router-dom';

export function Cpct() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6 flex gap-3 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/exams" className="text-blue-600 hover:text-blue-800">Exams</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">CPCT</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">CPCT Typing Test 2026 - Complete Guide</h1>
          <p className="text-lg text-gray-600">सीपीसीटी टाइपिंग टेस्ट 2026 - पूरी जानकारी (मध्य प्रदेश)</p>
        </header>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is CPCT? / सीपीसीटी क्या है?</h2>
          <p className="text-gray-600 mb-4">
            CPCT (Computer Proficiency Certification Test) is conducted by the <strong>Madhya Pradesh Agency for Promotion of
            Information Technology (MAP_IT)</strong> to certify computer proficiency of candidates applying for government jobs
            in Madhya Pradesh. It is mandatory for any MP government job that requires computer skills.
          </p>
          <p className="text-gray-600 mb-4">
            सीपीसीटी (कंप्यूटर प्रोफिशिएंसी सर्टिफिकेशन टेस्ट) <strong>मध्य प्रदेश एजेंसी फॉर प्रमोशन ऑफ इंफॉर्मेशन
            टेक्नोलॉजी (MAP_IT)</strong> द्वारा आयोजित किया जाता है। यह मध्य प्रदेश में कंप्यूटर कौशल की आवश्यकता वाली
            किसी भी सरकारी नौकरी के लिए अनिवार्य है।
          </p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm font-medium">Important: CPCT requires BOTH Hindi and English typing. You cannot choose only one language. / महत्वपूर्ण: सीपीसीटी में हिंदी और अंग्रेजी दोनों में टाइपिंग अनिवार्य है।</p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">CPCT Typing Speed Requirements / टाइपिंग स्पीड आवश्यकताएं</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Parameter</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">English Typing</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hindi Typing</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Minimum Speed</td>
                  <td className="py-3 px-4"><strong>30 WPM (NWPM)</strong></td>
                  <td className="py-3 px-4"><strong>20 WPM (NWPM)</strong></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Duration</td>
                  <td className="py-3 px-4">15 minutes</td>
                  <td className="py-3 px-4">15 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Mock Test (Before actual)</td>
                  <td className="py-3 px-4">5 minutes</td>
                  <td className="py-3 px-4">5 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Keyboard Layout</td>
                  <td className="py-3 px-4">QWERTY</td>
                  <td className="py-3 px-4">Remington (GAIL)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Font</td>
                  <td className="py-3 px-4">Standard English</td>
                  <td className="py-3 px-4">Kruti Dev / Mangal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">CPCT Exam Pattern / परीक्षा पैटर्न</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Part</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Section</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Part 1</td>
                  <td className="py-3 px-4">MCQ (Computer Knowledge)</td>
                  <td className="py-3 px-4">75 questions, 75 marks, 75 minutes. Qualifying: 38 marks.</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Part 2A</td>
                  <td className="py-3 px-4">English Typing Test</td>
                  <td className="py-3 px-4">15 minutes + 5 min mock. Minimum: 30 NWPM.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Part 2B</td>
                  <td className="py-3 px-4">Hindi Typing Test</td>
                  <td className="py-3 px-4">15 minutes + 5 min mock. Minimum: 20 NWPM.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">Total exam duration: 120 minutes (2 hours)</p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">CPCT 2026 Key Information / महत्वपूर्ण जानकारी</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-1">Registration Fee / पंजीकरण शुल्क</h3>
              <p className="text-2xl font-bold text-blue-600">₹660</p>
              <p className="text-sm text-gray-600">Same for all categories / सभी श्रेणियों के लिए समान</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-1">Scorecard Validity / स्कोरकार्ड वैधता</h3>
              <p className="text-2xl font-bold text-blue-600">7 Years</p>
              <p className="text-sm text-gray-600">From date of exam / परीक्षा की तारीख से</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-1">Eligibility / पात्रता</h3>
              <p className="text-sm text-gray-600">12th pass, Indian citizen, 18+ years. Polytechnic Diploma holders after 10th also eligible.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-1">Conducting Body / आयोजक निकाय</h3>
              <p className="text-sm text-gray-600">MAP_IT, Madhya Pradesh (cpct.mp.gov.in)</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">MP Government Jobs Requiring CPCT / सीपीसीटी आवश्यक नौकरियां</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Data Entry Operator (DEO)</strong> / डेटा एंट्री ऑपरेटर</li>
            <li><strong>Computer Operator</strong> / कंप्यूटर ऑपरेटर</li>
            <li><strong>Lower Division Clerk (LDC)</strong> / अवर श्रेणी लिपिक</li>
            <li><strong>Upper Division Clerk (UDC)</strong> / उच्च श्रेणी लिपिक</li>
            <li><strong>Office Assistant</strong> / कार्यालय सहायक</li>
            <li><strong>Accountant</strong> (in some departments) / लेखाकार</li>
            <li>Any MP government position requiring computer qualification</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs / अक्सर पूछे जाने वाले सवाल</h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Can I appear for CPCT from outside MP?</summary>
              <p className="text-gray-600 mt-2 text-sm">Yes, any Indian citizen who is 18+ and has passed 12th can appear for CPCT, regardless of domicile. However, the scorecard is primarily used for MP government jobs. / हां, कोई भी भारतीय नागरिक जो 18+ है और 12वीं पास है, सीपीसीटी में शामिल हो सकता है।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">How many times can I appear for CPCT?</summary>
              <p className="text-gray-600 mt-2 text-sm">There is no limit on attempts. You can appear multiple times to improve your score. The best score will be considered. / प्रयासों की कोई सीमा नहीं है। आप अपना स्कोर सुधारने के लिए कई बार परीक्षा दे सकते हैं।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Which Hindi keyboard layout is used in CPCT?</summary>
              <p className="text-gray-600 mt-2 text-sm">CPCT uses the Remington (GAIL) keyboard layout for Hindi typing with Kruti Dev 010 or Mangal font. Practice on this specific layout for best results. / सीपीसीटी हिंदी टाइपिंग के लिए रेमिंगटन (GAIL) कीबोर्ड लेआउट का उपयोग करता है।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Is CPCT score considered in final merit?</summary>
              <p className="text-gray-600 mt-2 text-sm">Unlike SSC exams where typing is purely qualifying, CPCT generates a scorecard with actual marks. Some MP departments may consider the CPCT score for ranking. / कुछ एमपी विभाग रैंकिंग के लिए सीपीसीटी स्कोर पर विचार कर सकते हैं।</p>
            </details>
          </div>
        </section>

        <section className="text-center bg-blue-600 text-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Practice CPCT Typing Test Now</h2>
          <p className="mb-1">सीपीसीटी टाइपिंग टेस्ट का अभ्यास अभी शुरू करें</p>
          <p className="mb-4 opacity-90">Set timer to 15 minutes. Practice both English (30 WPM) and Hindi (20 WPM).</p>
          <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Free Typing Test
          </Link>
        </section>
      </div>
    </div>
  );
}
