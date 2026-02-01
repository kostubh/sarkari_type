import { Link } from 'react-router-dom';
import { useTest } from '../../context/TestContext';
import { TimeConfig } from './TimeConfig';
import { TextSourceConfig } from './TextSourceConfig';
import { ScoringConfig } from './ScoringConfig';

export function PreTestScreen() {
  const { config, dispatch } = useTest();

  const isReady = config.customText && config.customText.trim().length > 0;

  const handleStartTest = () => {
    if (!isReady) {
      alert('Please generate or paste text before starting');
      return;
    }
    dispatch({
      type: 'START_TEST',
      payload: config.customText,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">SarkariType - Free Typing Test</h1>
          <p className="text-lg text-gray-600">Practice Typing for SSC, CPCT, RRB & Government Exams</p>
          <nav className="mt-4">
            <Link to="/exams" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition shadow-sm">
              View All Government Exams Requiring Typing Test &rarr;
            </Link>
          </nav>
        </header>

        {/* Configuration Sections */}
        <main>
          <div className="space-y-6 mb-8">
            <TimeConfig />
            <TextSourceConfig />
            <ScoringConfig />
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={handleStartTest}
              disabled={!isReady}
              className={`px-8 py-3 rounded-lg font-bold text-lg transition ${
                isReady
                  ? 'bg-green-600 text-white hover:bg-green-700 cursor-pointer'
                  : 'bg-gray-400 text-gray-600 cursor-not-allowed'
              }`}
            >
              {isReady ? '▶️ Start Test' : '⚠️ Configure & Generate Text First'}
            </button>
          </div>
        </main>

        {/* SEO Content - visible to users and crawlers */}
        <section className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Free Online Typing Test for Government Exams</h2>
          <p className="text-gray-600 mb-4">
            SarkariType is a free typing speed test designed for candidates preparing for Indian government exams.
            Whether you're preparing for <strong>SSC CHSL</strong>, <strong>CPCT</strong>, <strong>RRB NTPC</strong>,
            <strong> High Court</strong>, or any other sarkari exam that requires a typing test, SarkariType helps you
            practice and improve your typing speed and accuracy.
          </p>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">Why Choose SarkariType?</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
            <li><strong>Real-time WPM Tracking</strong> - Monitor your words per minute as you type</li>
            <li><strong>Accuracy Analysis</strong> - Detailed error breakdown with spelling, punctuation & case errors</li>
            <li><strong>AI-Generated Text</strong> - Practice with fresh content from 10+ topics</li>
            <li><strong>Government Document Practice</strong> - Type real government-style documents</li>
            <li><strong>PDF Result Export</strong> - Download your test results for record keeping</li>
            <li><strong>Customizable Tests</strong> - Set your own duration and scoring criteria</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-700 mb-3">Typing Speed Requirements for Government Exams</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-600 mb-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">Exam</th>
                  <th className="text-left py-2 pr-4 font-semibold text-gray-700">English WPM</th>
                  <th className="text-left py-2 font-semibold text-gray-700">Hindi WPM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">SSC CHSL (LDC/DEO)</td>
                  <td className="py-2 pr-4">35 WPM</td>
                  <td className="py-2">30 WPM</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">SSC CGL (Tax Assistant)</td>
                  <td className="py-2 pr-4">35 WPM</td>
                  <td className="py-2">30 WPM</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">CPCT</td>
                  <td className="py-2 pr-4">30 WPM</td>
                  <td className="py-2">25 WPM</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 pr-4">High Court (Clerk)</td>
                  <td className="py-2 pr-4">35 WPM</td>
                  <td className="py-2">30 WPM</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">RRB NTPC</td>
                  <td className="py-2 pr-4">30 WPM</td>
                  <td className="py-2">25 WPM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm">Start practicing now - select your text source above and begin your typing test!</p>
        </section>
      </div>
    </div>
  );
}