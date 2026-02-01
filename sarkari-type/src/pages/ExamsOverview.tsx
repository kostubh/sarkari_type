import { Link } from 'react-router-dom';

export function ExamsOverview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6">
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">&larr; Back to Typing Test</Link>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Government Exams Requiring Typing Test in 2026</h1>
          <p className="text-lg text-gray-600">सरकारी परीक्षाएं जिनमें टाइपिंग टेस्ट आवश्यक है</p>
        </header>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete List of Typing Tests in Government Exams</h2>
          <p className="text-gray-600 mb-6">
            Many Indian government exams require candidates to pass a typing speed test as part of the selection process.
            Below is a comprehensive list of all major exams with their typing requirements, exam dates, and preparation tips.
          </p>
          <p className="text-gray-600 mb-6">
            भारत में कई सरकारी परीक्षाओं में उम्मीदवारों को चयन प्रक्रिया के हिस्से के रूप में टाइपिंग स्पीड टेस्ट पास करना होता है।
            नीचे सभी प्रमुख परीक्षाओं की पूरी सूची उनकी टाइपिंग आवश्यकताओं, परीक्षा तिथियों और तैयारी के सुझावों के साथ दी गई है।
          </p>
        </section>

        {/* Quick Summary Table */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Typing Speed Requirements - Quick Summary</h2>
          <h3 className="text-lg text-gray-600 mb-4">टाइपिंग स्पीड आवश्यकताएं - संक्षिप्त सारांश</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Exam / परीक्षा</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">English WPM</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hindi WPM</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Nature</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4"><Link to="/exams/ssc-chsl" className="text-blue-600 hover:underline font-medium">SSC CHSL</Link></td>
                  <td className="py-3 px-4">35 WPM</td>
                  <td className="py-3 px-4">30 WPM</td>
                  <td className="py-3 px-4">10 min</td>
                  <td className="py-3 px-4">Qualifying</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4"><Link to="/exams/ssc-cgl" className="text-blue-600 hover:underline font-medium">SSC CGL (DEST)</Link></td>
                  <td className="py-3 px-4">2000 KD/15min</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">15 min</td>
                  <td className="py-3 px-4">Qualifying</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4"><Link to="/exams/cpct" className="text-blue-600 hover:underline font-medium">CPCT (MP)</Link></td>
                  <td className="py-3 px-4">30 WPM</td>
                  <td className="py-3 px-4">20 WPM</td>
                  <td className="py-3 px-4">15 min each</td>
                  <td className="py-3 px-4">Scoring</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4"><Link to="/exams/rrb-ntpc" className="text-blue-600 hover:underline font-medium">RRB NTPC</Link></td>
                  <td className="py-3 px-4">30 WPM</td>
                  <td className="py-3 px-4">25 WPM</td>
                  <td className="py-3 px-4">10 min</td>
                  <td className="py-3 px-4">Qualifying</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4"><Link to="/exams/high-court" className="text-blue-600 hover:underline font-medium">High Court (Clerk)</Link></td>
                  <td className="py-3 px-4">35-40 WPM</td>
                  <td className="py-3 px-4">30 WPM</td>
                  <td className="py-3 px-4">10 min</td>
                  <td className="py-3 px-4">Varies by state</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4"><Link to="/exams/ssc-steno" className="text-blue-600 hover:underline font-medium">SSC Stenographer</Link></td>
                  <td className="py-3 px-4">40 WPM</td>
                  <td className="py-3 px-4">35 WPM</td>
                  <td className="py-3 px-4">10 min</td>
                  <td className="py-3 px-4">Qualifying</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Exam Cards */}
        <section className="grid md:grid-cols-2 gap-6 mb-8">
          <Link to="/exams/ssc-chsl" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition block">
            <h3 className="text-xl font-bold text-gray-800 mb-2">SSC CHSL Typing Test</h3>
            <p className="text-sm text-gray-500 mb-2">एसएससी सीएचएसएल टाइपिंग टेस्ट</p>
            <p className="text-gray-600 text-sm">LDC, JSA, PA/SA posts. English: 35 WPM, Hindi: 30 WPM. Notification expected April 2026.</p>
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more &rarr;</span>
          </Link>

          <Link to="/exams/ssc-cgl" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition block">
            <h3 className="text-xl font-bold text-gray-800 mb-2">SSC CGL DEST</h3>
            <p className="text-sm text-gray-500 mb-2">एसएससी सीजीएल डेस्ट</p>
            <p className="text-gray-600 text-sm">Data Entry Speed Test for Tax Assistant & DEO. 2000 key depressions in 15 minutes.</p>
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more &rarr;</span>
          </Link>

          <Link to="/exams/cpct" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition block">
            <h3 className="text-xl font-bold text-gray-800 mb-2">CPCT Typing Test</h3>
            <p className="text-sm text-gray-500 mb-2">सीपीसीटी टाइपिंग टेस्ट</p>
            <p className="text-gray-600 text-sm">MP Government computer proficiency test. Both Hindi & English typing mandatory. Scorecard valid 7 years.</p>
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more &rarr;</span>
          </Link>

          <Link to="/exams/rrb-ntpc" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition block">
            <h3 className="text-xl font-bold text-gray-800 mb-2">RRB NTPC Typing Test</h3>
            <p className="text-sm text-gray-500 mb-2">आरआरबी एनटीपीसी टाइपिंग टेस्ट</p>
            <p className="text-gray-600 text-sm">Railway recruitment for Clerk, CA, TA posts. Computer Based Typing Skill Test (CBTST).</p>
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more &rarr;</span>
          </Link>

          <Link to="/exams/high-court" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition block">
            <h3 className="text-xl font-bold text-gray-800 mb-2">High Court Typing Test</h3>
            <p className="text-sm text-gray-500 mb-2">हाई कोर्ट टाइपिंग टेस्ट</p>
            <p className="text-gray-600 text-sm">Clerk & Stenographer posts across Rajasthan, Bombay, Allahabad, Patna & more High Courts.</p>
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more &rarr;</span>
          </Link>

          <Link to="/exams/ssc-steno" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition block">
            <h3 className="text-xl font-bold text-gray-800 mb-2">SSC Stenographer Typing</h3>
            <p className="text-sm text-gray-500 mb-2">एसएससी स्टेनोग्राफर टाइपिंग</p>
            <p className="text-gray-600 text-sm">Grade C & D posts. Shorthand + typing skill test. English: 40 WPM, Hindi: 35 WPM.</p>
            <span className="text-blue-600 text-sm font-medium mt-2 inline-block">Read more &rarr;</span>
          </Link>
        </section>

        {/* General Tips */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Typing Test Preparation Tips / टाइपिंग टेस्ट तैयारी के टिप्स</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">English</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Practice daily</strong> for at least 30 minutes to build muscle memory</li>
                <li><strong>Focus on accuracy first</strong> - speed comes naturally with practice</li>
                <li><strong>Learn touch typing</strong> - don't look at the keyboard while typing</li>
                <li><strong>Use proper posture</strong> - sit straight with wrists level to the keyboard</li>
                <li><strong>Practice with government-style passages</strong> for exam familiarity</li>
                <li><strong>Track your WPM daily</strong> using SarkariType's real-time analytics</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">हिंदी</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>रोज़ाना अभ्यास करें</strong> - कम से कम 30 मिनट टाइपिंग प्रैक्टिस करें</li>
                <li><strong>पहले सटीकता पर ध्यान दें</strong> - स्पीड अभ्यास से खुद बढ़ेगी</li>
                <li><strong>टच टाइपिंग सीखें</strong> - कीबोर्ड देखे बिना टाइप करना सीखें</li>
                <li><strong>सही बैठने की स्थिति रखें</strong> - सीधे बैठें, कलाई कीबोर्ड के बराबर रखें</li>
                <li><strong>सरकारी पैसेज से प्रैक्टिस करें</strong> - परीक्षा जैसे पैराग्राफ टाइप करें</li>
                <li><strong>अपनी WPM ट्रैक करें</strong> - SarkariType के रियल-टाइम एनालिटिक्स का उपयोग करें</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-blue-600 text-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Start Practicing Now / अभी प्रैक्टिस शुरू करें</h2>
          <p className="mb-4 opacity-90">Use SarkariType's free typing test to prepare for your government exam.</p>
          <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Free Typing Test
          </Link>
        </section>
      </div>
    </div>
  );
}
