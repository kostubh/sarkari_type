import { useState, useEffect } from 'react';
import { TestConfig, TestState } from '../../types';
import { generateResultPDF } from '../../utils/pdfGenerator';

interface PDFExportProps {
  testConfig: TestConfig;
  testState: TestState;
}

const CANDIDATE_NAME_KEY = 'sarkaritype_candidate_name';

export function PDFExport({ testConfig, testState }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);

  // Load saved name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem(CANDIDATE_NAME_KEY);
    if (savedName) {
      setCandidateName(savedName);
    }
  }, []);

  const handleGeneratePDF = async () => {
    // Save name to localStorage if provided
    if (candidateName.trim()) {
      localStorage.setItem(CANDIDATE_NAME_KEY, candidateName.trim());
    }

    setIsGenerating(true);
    setError(null);

    try {
      await generateResultPDF('', testConfig, testState, candidateName.trim() || 'Anonymous User');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Download Comprehensive Report</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate a detailed 4-page professional PDF report including:
          </p>
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Executive summary with key performance indicators</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Detailed character and word-level accuracy analysis</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Complete text comparison (reference vs. your typing)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Performance interpretation and personalized recommendations</span>
            </li>
          </ul>

          {/* Name Input Section */}
          <div className="mb-4">
            <button
              onClick={() => setShowNameInput(!showNameInput)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              {showNameInput ? '▼' : '▶'} {candidateName ? 'Edit candidate name' : 'Add candidate name (optional)'}
            </button>
            
            {showNameInput && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Candidate Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="Enter your name (or leave blank for 'Anonymous User')"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Your name will be saved for future reports and displayed in the PDF.
                </p>
              </div>
            )}
            
            {candidateName && !showNameInput && (
              <p className="mt-1 text-sm text-gray-600">
                Report will be generated for: <span className="font-semibold">{candidateName}</span>
              </p>
            )}
          </div>

          <button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Download Professional Report</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-2">
              <span className="flex-shrink-0 text-lg">⚠️</span>
              <div className="flex-1">
                <p className="font-semibold">Error generating PDF</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
