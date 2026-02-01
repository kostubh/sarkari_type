import { Link } from 'react-router-dom';

export function HighCourt() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-6 flex gap-3 text-sm">
          <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="text-gray-400">/</span>
          <Link to="/exams" className="text-blue-600 hover:text-blue-800">Exams</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">High Court</span>
        </nav>

        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">High Court Typing Test 2026 - State-wise Guide</h1>
          <p className="text-lg text-gray-600">हाई कोर्ट टाइपिंग टेस्ट 2026 - राज्यवार जानकारी</p>
        </header>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">High Court Typing Tests in India</h2>
          <p className="text-gray-600 mb-4">
            Various High Courts across India conduct recruitment for <strong>Clerk</strong>, <strong>Stenographer</strong>,
            <strong> Junior Assistant</strong>, and other administrative posts that require typing proficiency. Each High Court
            has its own typing speed requirements, keyboard layouts, and evaluation criteria.
          </p>
          <p className="text-gray-600">
            भारत भर के विभिन्न उच्च न्यायालय <strong>क्लर्क</strong>, <strong>स्टेनोग्राफर</strong>,
            <strong> जूनियर असिस्टेंट</strong> और अन्य प्रशासनिक पदों के लिए भर्ती करते हैं जिनमें टाइपिंग दक्षता
            आवश्यक है। प्रत्येक उच्च न्यायालय की अपनी टाइपिंग स्पीड आवश्यकताएं हैं।
          </p>
        </section>

        {/* State-wise breakdown */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">State-wise Typing Requirements / राज्यवार टाइपिंग आवश्यकताएं</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-blue-50">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">High Court</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Post</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">English</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Hindi/Regional</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Rajasthan HC</td>
                  <td className="py-3 px-4">Clerk/Steno</td>
                  <td className="py-3 px-4">8,000 KDPH</td>
                  <td className="py-3 px-4">8,000 KDPH</td>
                  <td className="py-3 px-4">10 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Bombay HC</td>
                  <td className="py-3 px-4">Junior Clerk</td>
                  <td className="py-3 px-4">40 WPM</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">10 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Bombay HC</td>
                  <td className="py-3 px-4">Stenographer</td>
                  <td className="py-3 px-4">40 WPM typing</td>
                  <td className="py-3 px-4">80 WPM Marathi shorthand</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Allahabad HC</td>
                  <td className="py-3 px-4">Stenographer</td>
                  <td className="py-3 px-4">100 WPM shorthand</td>
                  <td className="py-3 px-4">80 WPM shorthand</td>
                  <td className="py-3 px-4">30 min transcription</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">Patna HC</td>
                  <td className="py-3 px-4">Stenographer</td>
                  <td className="py-3 px-4">400 words/10 min</td>
                  <td className="py-3 px-4">—</td>
                  <td className="py-3 px-4">10 min (90% accuracy)</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">HP HC</td>
                  <td className="py-3 px-4">Stenographer</td>
                  <td className="py-3 px-4">40 WPM</td>
                  <td className="py-3 px-4">30 WPM</td>
                  <td className="py-3 px-4">—</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Telangana DC</td>
                  <td className="py-3 px-4">Typist/Copyist</td>
                  <td className="py-3 px-4">35 WPM</td>
                  <td className="py-3 px-4">30 WPM Telugu</td>
                  <td className="py-3 px-4">10 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Detailed sections for major courts */}
        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rajasthan High Court / राजस्थान उच्च न्यायालय</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Posts: Stenographer Grade-III/II, Junior Personal Assistant (JPA), LDC</li>
            <li>Speed requirement: Minimum 8,000 KDPH (Key Depressions Per Hour)</li>
            <li>English Font: Calibri; Hindi Font: Kruti Dev 010 (Remington GAIL layout)</li>
            <li>Typing test carries <strong>50 marks</strong> with minimum 22.5 marks to qualify</li>
            <li>पद: स्टेनोग्राफर ग्रेड-III/II, जूनियर पर्सनल असिस्टेंट, LDC</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Bombay High Court / बॉम्बे उच्च न्यायालय</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>2025-26 recruitment: <strong>2,381 vacancies</strong> including Clerk, Stenographer, Driver, Peon</li>
            <li>Junior Clerk: Type a 400-word passage in 10 minutes (40 WPM), test carries 20 marks</li>
            <li>Minimum 10 marks required to pass typing and proceed to Viva-voce</li>
            <li>Stenographer: 100 WPM English shorthand + 80 WPM Marathi shorthand + 40 WPM typing</li>
            <li>2025-26 भर्ती: क्लर्क, स्टेनोग्राफर सहित 2,381 पद</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Allahabad High Court / इलाहाबाद उच्च न्यायालय</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Hindi Stenography: 400-word passage dictated at 80 WPM, transcribe within 30 minutes</li>
            <li>English Stenography: 500-word passage dictated at 100 WPM, transcribe within 30 minutes</li>
            <li>Both shorthand and typing skills are tested</li>
            <li>हिंदी आशुलिपि: 80 WPM पर 400 शब्दों का पैसेज, 30 मिनट में ट्रांसक्राइब करें</li>
          </ul>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Prepare / तैयारी कैसे करें</h2>
          <div className="space-y-3 text-gray-600">
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <p><strong>Check your specific High Court requirements</strong> - each court has different speed and accuracy standards. / अपनी विशिष्ट हाई कोर्ट आवश्यकताएं जांचें।</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <p><strong>Practice on the correct keyboard layout</strong> - most Hindi typing uses Remington GAIL with Kruti Dev font. / सही कीबोर्ड लेआउट पर अभ्यास करें।</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
              <p><strong>Target 5+ WPM above the requirement</strong> - exam pressure reduces speed by 3-5 WPM on average. / आवश्यकता से 5+ WPM अधिक लक्ष्य रखें।</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-green-100 text-green-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">4</span>
              <p><strong>Practice legal/formal language passages</strong> - High Court tests often use legal terminology. / कानूनी/औपचारिक भाषा के पैसेज से अभ्यास करें।</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQs / अक्सर पूछे जाने वाले सवाल</h2>
          <div className="space-y-4">
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Are High Court typing tests the same across all states?</summary>
              <p className="text-gray-600 mt-2 text-sm">No, each High Court sets its own typing requirements, speed standards, and evaluation criteria. Always check the official recruitment notification for your specific court. / नहीं, प्रत्येक उच्च न्यायालय अपनी स्वयं की टाइपिंग आवश्यकताएं निर्धारित करता है।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Is the typing test marks-based or qualifying?</summary>
              <p className="text-gray-600 mt-2 text-sm">It varies by court. Rajasthan HC gives marks (50 marks), while Bombay HC gives marks for Clerk (20 marks). Some courts treat it as purely qualifying. / यह न्यायालय के अनुसार भिन्न होता है।</p>
            </details>
            <details className="border border-gray-200 rounded-lg p-4">
              <summary className="font-semibold text-gray-700 cursor-pointer">Which font and keyboard layout should I practice?</summary>
              <p className="text-gray-600 mt-2 text-sm">For Hindi: Kruti Dev 010 font with Remington (GAIL) keyboard layout is used in most courts. For English: Calibri or Times New Roman with standard QWERTY keyboard. / हिंदी के लिए: कृति देव 010 फ़ॉन्ट, रेमिंगटन (GAIL) कीबोर्ड लेआउट।</p>
            </details>
          </div>
        </section>

        <section className="text-center bg-blue-600 text-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-3">Practice High Court Typing Test Now</h2>
          <p className="mb-1">हाई कोर्ट टाइपिंग टेस्ट का अभ्यास अभी शुरू करें</p>
          <p className="mb-4 opacity-90">Set timer to 10 minutes and target 40 WPM for best preparation.</p>
          <Link to="/" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Start Free Typing Test
          </Link>
        </section>
      </div>
    </div>
  );
}
