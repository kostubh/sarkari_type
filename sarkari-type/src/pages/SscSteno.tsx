import { Link } from 'react-router-dom';

export function SscSteno() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6 flex gap-3 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/exams" className="text-blue-600 hover:text-blue-800">Exams</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">SSC Stenographer</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">SSC Stenographer Typing Test 2026 - Complete Guide</h1>
          <p className="text-lg text-gray-600">एसएससी स्टेनोग्राफर टाइपिंग टेस्ट 2026 - पूरी जानकारी</p>
        </header>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What is SSC Stenographer Exam?</h2>
          <p className="text-gray-600 mb-4">
            The SSC Stenographer exam is conducted for recruitment to <strong>Grade C</strong> and <strong>Grade D</strong>
            Stenographer posts in various central government ministries and departments. The exam has a unique skill test
            that combines both <strong>shorthand dictation</strong> and <strong>computer-based typing (transcription)</strong>.
          </p>
          <p className="text-gray-600">
            एसएससी स्टेनोग्राफर परीक्षा विभिन्न केंद्रीय सरकारी मंत्रालयों में <strong>ग्रेड C</strong> और <strong>ग्रेड D</strong>
            स्टेनोग्राफर पदों की भर्ती के लिए आयोजित की जाती है। परीक्षा में <strong>आशुलिपि डिक्टेशन</strong> और
            <strong> कंप्यूटर-आधारित टाइपिंग (ट्रांसक्रिप्शन)</strong> दोनों का संयोजन है।
          </p>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Typing & Shorthand Requirements / आवश्यकताएं</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Parameter</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade C</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Grade D</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Shorthand Speed (English)</td>
                  <td className="py-3 px-4"><strong>100 WPM</strong></td>
                  <td className="py-3 px-4"><strong>80 WPM</strong></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Shorthand Speed (Hindi)</td>
                  <td className="py-3 px-4"><strong>100 WPM</strong></td>
                  <td className="py-3 px-4"><strong>80 WPM</strong></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Transcription Time (English)</td>
                  <td className="py-3 px-4">40 minutes</td>
                  <td className="py-3 px-4">50 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Transcription Time (Hindi)</td>
                  <td className="py-3 px-4">55 minutes</td>
                  <td className="py-3 px-4">65 minutes</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Typing Speed Required</td>
                  <td className="py-3 px-4">~40 WPM (English)</td>
                  <td className="py-3 px-4">~35 WPM (English)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Pay Level</td>
                  <td className="py-3 px-4">Level 6: ₹35,400-1,12,400</td>
                  <td className="py-3 px-4">Level 4: ₹25,500-81,100</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Nature of Skill Test</td>
                  <td className="py-3 px-4" colSpan={2}>Qualifying (must pass to be selected)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Skill Test Process / कौशल परीक्षा प्रक्रिया</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <div>
                <h3 className="font-semibold text-gray-700">Dictation / डिक्टेशन</h3>
                <p className="text-sm">A passage is dictated at the required shorthand speed (80/100 WPM). You write it in shorthand on paper. Duration: 10 minutes.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <div>
                <h3 className="font-semibold text-gray-700">Transcription on Computer / कंप्यूटर पर ट्रांसक्रिप्शन</h3>
                <p className="text-sm">You type out the shorthand notes on a computer within the allotted time. Grade C: 40 min (English), Grade D: 50 min (English). <strong>This is where typing speed matters!</strong></p>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
            <p className="text-yellow-800 text-sm"><strong>Note:</strong> Even though the exam is primarily about shorthand, fast typing speed is crucial for transcription. A typist who can type at 40+ WPM will have more time to review and correct errors. / तेज़ टाइपिंग स्पीड ट्रांसक्रिप्शन के लिए महत्वपूर्ण है।</p>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Grade C vs Grade D Comparison / ग्रेड C और D की तुलना</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-blue-800 mb-2">Grade C (Senior) / ग्रेड C</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Pay: ₹35,400-1,12,400 (Level 6)</li>
                <li>Shorthand: 100 WPM</li>
                <li>Transcription: 40 min (English)</li>
                <li>Posted in: Ministries, Attached offices</li>
                <li>Higher responsibility and career growth</li>
              </ul>
            </div>
            <div className="border-2 border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-800 mb-2">Grade D (Junior) / ग्रेड D</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Pay: ₹25,500-81,100 (Level 4)</li>
                <li>Shorthand: 80 WPM</li>
                <li>Transcription: 50 min (English)</li>
                <li>Posted in: Subordinate offices</li>
                <li>Good entry-level position</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Preparation Tips / तैयारी के टिप्स</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Build typing speed first</strong> - aim for 40+ WPM before focusing heavily on shorthand / पहले टाइपिंग स्पीड बनाएं</li>
            <li><strong>Practice transcription</strong> - write shorthand and then type it out to simulate the actual test</li>
            <li><strong>Learn keyboard shortcuts</strong> - Ctrl+Z, Ctrl+A, and other shortcuts save time during transcription</li>
            <li><strong>Practice with formal/official language</strong> - SSC uses government-style passages / औपचारिक भाषा से अभ्यास करें</li>
            <li><strong>Time yourself strictly</strong> - practice within the exact time limits (40/50 min for transcription)</li>
            <li><strong>Reduce error rate</strong> - accuracy is critical in transcription; aim for less than 5% errors</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs / अक्सर पूछे जाने वाले सवाल</h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Can I apply for both Grade C and Grade D?</summary>
              <p className="text-gray-600 mt-2 text-sm">Yes, you can apply for both grades in a single application. If you qualify for Grade C, you'll be considered for it first. If not, you may be considered for Grade D. / हां, आप एक ही आवेदन में दोनों ग्रेड के लिए आवेदन कर सकते हैं।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Is shorthand necessary even for Grade D?</summary>
              <p className="text-gray-600 mt-2 text-sm">Yes, shorthand is mandatory for both Grade C and Grade D. The only difference is the speed requirement (100 vs 80 WPM) and transcription time. / हां, दोनों ग्रेड के लिए आशुलिपि अनिवार्य है।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">What is the minimum educational qualification?</summary>
              <p className="text-gray-600 mt-2 text-sm">12th pass (Higher Secondary) from a recognized board. No graduation required. Age limit: 18-27 years for Grade C, 18-27 years for Grade D (with relaxation for reserved categories). / 12वीं पास।</p>
            </details>
          </div>
        </section>

        <section className="text-center bg-blue-600 text-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Practice Stenographer Typing Speed Now</h2>
          <p className="mb-1">स्टेनोग्राफर टाइपिंग स्पीड का अभ्यास अभी शुरू करें</p>
          <p className="mb-4 opacity-90">Build your typing speed to 40+ WPM for faster transcription.</p>
          <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Free Typing Test
          </Link>
        </section>
      </div>
    </div>
  );
}
