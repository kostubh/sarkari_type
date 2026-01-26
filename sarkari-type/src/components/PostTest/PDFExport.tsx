import { useState } from 'react';
import { TestConfig, TestState } from '../../types';
import { generateResultPDF } from '../../utils/pdfGenerator';

interface PDFExportProps {
  testConfig: TestConfig;
  testState: TestState;
}

export function PDFExport({ testConfig, testState }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      await generateResultPDF('', testConfig, testState);
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
