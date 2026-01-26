import { useRef, useState } from 'react';
import { TestConfig, TestState } from '../../types';
import { generateResultPDF } from '../../utils/pdfGenerator';

interface PDFExportProps {
  testConfig: TestConfig;
  testState: TestState;
}

export function PDFExport({ testConfig, testState }: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      if (!resultRef.current) {
        throw new Error('Result element not found');
      }

      await generateResultPDF('pdf-content', testConfig, testState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      {/* Hidden PDF content */}
      <div id="pdf-content" ref={resultRef} className="hidden">
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
          <h1 style={{ marginBottom: '20px' }}>SarkariType - Test Results</h1>

          <div style={{ marginBottom: '20px' }}>
            <p>
              <strong>Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p>
              <strong>Time:</strong> {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div style={{ marginBottom: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{testState.wpm.toFixed(1)}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>WPM</div>
            </div>
            <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{testState.accuracy.toFixed(1)}%</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Accuracy</div>
            </div>
            <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{testState.finalScore}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Score</div>
            </div>
            <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{testState.elapsedSeconds.toFixed(1)}s</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Duration</div>
            </div>
          </div>

          <h3 style={{ marginBottom: '10px', marginTop: '20px' }}>Test Configuration</h3>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '20px' }}>
            <p>Time Mode: {testConfig.timeMode}</p>
            <p>Text Source: {testConfig.textSource}</p>
            <p>Duration: {testConfig.duration} seconds</p>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">📥 Download Report</h3>

        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isGenerating ? '⏳ Generating PDF...' : '📄 Download PDF Report'}
        </button>

        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded border border-red-200">{error}</div>}
      </div>
    </div>
  );
}
