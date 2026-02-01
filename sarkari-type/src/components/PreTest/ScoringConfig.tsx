import { useTest } from '../../context/TestContext';

interface ExamPreset {
  name: string;
  nameHi: string;
  description: string;
  duration: number;
  wordCount: number;
  timeMode: 'timed' | 'timeless';
  scoring: {
    correctWord: number;
    missingWord: number;
    incorrectSpelling: number;
    punctuationError: number;
    caseError: number;
  };
  officialRef: {
    label: string;
    url: string;
  };
}

// Scoring rationale based on official exam error evaluation:
// SSC uses "Full Mistakes" (1 error) and "Half Mistakes" (0.5 error) system:
//   Full Mistakes: omission, addition, substitution, spelling errors, incomplete words
//   Half Mistakes: spacing errors, capitalization, punctuation, transposition
// Ref: https://ssc.nic.in/Downloads/portal/english/evaluation-dest-tt.pdf
// CPCT uses NWPM = Gross WPM - (Total Errors / Time in minutes), every error reduces net speed
// High Courts generally have near-zero tolerance for errors

const EXAM_PRESETS: Record<string, ExamPreset> = {
  custom: {
    name: 'Custom',
    nameHi: 'कस्टम',
    description: 'Configure your own scoring and time settings',
    duration: 1,
    wordCount: 100,
    timeMode: 'timed',
    scoring: {
      correctWord: 10,
      missingWord: -5,
      incorrectSpelling: -2,
      punctuationError: -1,
      caseError: -1,
    },
    officialRef: { label: '', url: '' },
  },
  'ssc-chsl-english': {
    name: 'SSC CHSL - English Typing',
    nameHi: 'एसएससी सीएचएसएल - अंग्रेजी टाइपिंग',
    description: '35 WPM, 10 min, max 7% errors (General). Full Mistake = -10, Half Mistake = -5.',
    duration: 10,
    wordCount: 350,
    timeMode: 'timed',
    // SSC CHSL: strict 7% error limit. Full mistakes for spelling/missing, half for case/punctuation.
    scoring: {
      correctWord: 10,
      missingWord: -10,     // Full Mistake: omission/addition
      incorrectSpelling: -10, // Full Mistake: substitution/spelling
      punctuationError: -5,  // Half Mistake: punctuation errors
      caseError: -5,         // Half Mistake: capitalization errors
    },
    officialRef: {
      label: 'SSC CHSL 2024 Notification (ssc.gov.in)',
      url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice%20of%20CHSLE%202024_05_04_24.pdf',
    },
  },
  'ssc-chsl-hindi': {
    name: 'SSC CHSL - Hindi Typing',
    nameHi: 'एसएससी सीएचएसएल - हिंदी टाइपिंग',
    description: '30 WPM, 10 min, max 7% errors (General). Full Mistake = -10, Half Mistake = -5.',
    duration: 10,
    wordCount: 300,
    timeMode: 'timed',
    // Same SSC evaluation rules as English variant
    scoring: {
      correctWord: 10,
      missingWord: -10,     // Full Mistake
      incorrectSpelling: -10, // Full Mistake
      punctuationError: -5,  // Half Mistake
      caseError: -5,         // Half Mistake (matra/vowel sign errors)
    },
    officialRef: {
      label: 'SSC CHSL 2024 Notification (ssc.gov.in)',
      url: 'https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice%20of%20CHSLE%202024_05_04_24.pdf',
    },
  },
  'ssc-cgl-dest': {
    name: 'SSC CGL - DEST (Data Entry)',
    nameHi: 'एसएससी सीजीएल - डेस्ट',
    description: '2000 key depressions in 15 min, max 20% errors (General). Lenient scoring.',
    duration: 15,
    wordCount: 400,
    timeMode: 'timed',
    // SSC CGL DEST: lenient 20% error limit (25% OBC/EWS, 30% SC/ST). Key depression speed matters more.
    scoring: {
      correctWord: 10,
      missingWord: -5,      // Lenient: focus is on speed not accuracy
      incorrectSpelling: -3, // Lenient penalty
      punctuationError: -1,  // Minimal penalty
      caseError: -1,         // Minimal penalty
    },
    officialRef: {
      label: 'SSC CGL 2024 Syllabus & DEST Rules (ssc.gov.in)',
      url: 'https://ssc.gov.in/api/attachment/uploads/masterData/Syllabus/CGL-syllabus-169635-.pdf',
    },
  },
  'cpct-english': {
    name: 'CPCT - English Typing',
    nameHi: 'सीपीसीटी - अंग्रेजी टाइपिंग',
    description: '30 NWPM, 15 min. Every error reduces net speed. NWPM = Gross WPM - (Errors/Time).',
    duration: 15,
    wordCount: 450,
    timeMode: 'timed',
    // CPCT: each error directly reduces NWPM. All error types equally penalized.
    scoring: {
      correctWord: 10,
      missingWord: -10,      // Each missing word = 1 full error deducted from NWPM
      incorrectSpelling: -10, // Each spelling error = 1 full error
      punctuationError: -10,  // Punctuation errors also counted as full errors in CPCT
      caseError: -10,         // Case errors also counted as full errors in CPCT
    },
    officialRef: {
      label: 'CPCT Rule Book (cpct.mp.gov.in)',
      url: 'https://www.cpct.mp.gov.in/per/g01/pub/1172/ASM/WebPortal/1/PDF/CPCT_Rule_book_new.pdf',
    },
  },
  'cpct-hindi': {
    name: 'CPCT - Hindi Typing',
    nameHi: 'सीपीसीटी - हिंदी टाइपिंग',
    description: '20 NWPM, 15 min, Remington GAIL layout. Every error reduces net speed.',
    duration: 15,
    wordCount: 300,
    timeMode: 'timed',
    // Same CPCT rules: all errors equally penalized in NWPM calculation
    scoring: {
      correctWord: 10,
      missingWord: -10,
      incorrectSpelling: -10,
      punctuationError: -10,
      caseError: -10,
    },
    officialRef: {
      label: 'CPCT Typing Instructions (cpct.mp.gov.in)',
      url: 'https://cpct.mp.gov.in/per/g01/pub/1172/ASM/WebPortal/1/downloads/English_inst.pdf',
    },
  },
  'rrb-ntpc-english': {
    name: 'RRB NTPC - English Typing',
    nameHi: 'आरआरबी एनटीपीसी - अंग्रेजी टाइपिंग',
    description: '30 WPM, 10 min. Moderate error tolerance. Full/half mistake system.',
    duration: 10,
    wordCount: 300,
    timeMode: 'timed',
    // RRB: similar to SSC full/half mistake system but moderate tolerance
    scoring: {
      correctWord: 10,
      missingWord: -8,       // Full Mistake (slightly lenient vs SSC)
      incorrectSpelling: -8,  // Full Mistake
      punctuationError: -4,   // Half Mistake
      caseError: -4,          // Half Mistake
    },
    officialRef: {
      label: 'RRB NTPC CEN 05/2024 CBTST Notice (rrbcdg.gov.in)',
      url: 'https://www.rrbcdg.gov.in/uploads/2024/05-NTPCG/052024NTPCG-CBTST.pdf',
    },
  },
  'rrb-ntpc-hindi': {
    name: 'RRB NTPC - Hindi Typing',
    nameHi: 'आरआरबी एनटीपीसी - हिंदी टाइपिंग',
    description: '25 WPM, 10 min, Remington GAIL layout. Moderate error tolerance.',
    duration: 10,
    wordCount: 250,
    timeMode: 'timed',
    scoring: {
      correctWord: 10,
      missingWord: -8,
      incorrectSpelling: -8,
      punctuationError: -4,
      caseError: -4,
    },
    officialRef: {
      label: 'RRB NTPC CEN 05/2024 CBTST Notice (rrbcdg.gov.in)',
      url: 'https://www.rrbcdg.gov.in/uploads/2024/05-NTPCG/052024NTPCG-CBTST.pdf',
    },
  },
  'high-court-clerk': {
    name: 'High Court - Clerk (English)',
    nameHi: 'हाई कोर्ट - क्लर्क (अंग्रेजी)',
    description: '35-40 WPM, 10 min. Very strict: near-zero error tolerance.',
    duration: 10,
    wordCount: 400,
    timeMode: 'timed',
    // High Courts: extremely strict accuracy requirements. Every error type heavily penalized.
    scoring: {
      correctWord: 10,
      missingWord: -10,      // Zero tolerance for omissions
      incorrectSpelling: -10, // Zero tolerance for spelling
      punctuationError: -8,   // Heavy punctuation penalty
      caseError: -8,          // Heavy case penalty
    },
    officialRef: {
      label: 'Bombay High Court Recruitment (bombayhighcourt.nic.in)',
      url: 'https://bombayhighcourt.nic.in/recruitments.php',
    },
  },
  'ssc-steno-grade-d': {
    name: 'SSC Stenographer Grade D',
    nameHi: 'एसएससी स्टेनोग्राफर ग्रेड D',
    description: '80 WPM shorthand, 50 min transcription. SSC full/half mistake rules apply.',
    duration: 10,
    wordCount: 350,
    timeMode: 'timed',
    // SSC Steno: follows SSC evaluation, transcription accuracy is key
    scoring: {
      correctWord: 10,
      missingWord: -10,      // Full Mistake
      incorrectSpelling: -8,  // Full Mistake (slightly lenient for transcription)
      punctuationError: -5,   // Half Mistake
      caseError: -3,          // Half Mistake (lower weight for steno)
    },
    officialRef: {
      label: 'SSC Exam Calendar 2025 (ssc.gov.in)',
      url: 'https://ssc.gov.in/api/attachment/uploads/masterData/ExamCalendar/Tentative%20Calendar%202025%20_%20051224.pdf',
    },
  },
  'ssc-steno-grade-c': {
    name: 'SSC Stenographer Grade C',
    nameHi: 'एसएससी स्टेनोग्राफर ग्रेड C',
    description: '100 WPM shorthand, 40 min transcription. Stricter than Grade D.',
    duration: 10,
    wordCount: 400,
    timeMode: 'timed',
    // SSC Steno Grade C: stricter than D, higher accuracy expected
    scoring: {
      correctWord: 10,
      missingWord: -10,      // Full Mistake
      incorrectSpelling: -10, // Full Mistake (strict for Grade C)
      punctuationError: -5,   // Half Mistake
      caseError: -5,          // Half Mistake (stricter than Grade D)
    },
    officialRef: {
      label: 'SSC Exam Calendar 2025 (ssc.gov.in)',
      url: 'https://ssc.gov.in/api/attachment/uploads/masterData/ExamCalendar/Tentative%20Calendar%202025%20_%20051224.pdf',
    },
  },
};

export function ScoringConfig() {
  const { config, dispatch } = useTest();

  const updateScoring = (key: keyof typeof config.scoringOptions, value: number) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        scoringOptions: {
          ...config.scoringOptions,
          [key]: value,
        },
      },
    });
  };

  const updateDisplay = (key: keyof typeof config.displaySettings, value: string | boolean) => {
    dispatch({
      type: 'SET_CONFIG',
      payload: {
        displaySettings: {
          ...config.displaySettings,
          [key]: value,
        },
      },
    });
  };

  const applyPreset = (presetKey: string) => {
    const preset = EXAM_PRESETS[presetKey];
    if (!preset) return;

    dispatch({
      type: 'SET_CONFIG',
      payload: {
        timeMode: preset.timeMode,
        duration: preset.duration,
        wordCount: preset.wordCount,
        scoringOptions: { ...preset.scoring },
      },
    });
  };

  const getCurrentPresetKey = (): string => {
    for (const [key, preset] of Object.entries(EXAM_PRESETS)) {
      if (key === 'custom') continue;
      if (
        config.duration === preset.duration &&
        config.wordCount === preset.wordCount &&
        config.timeMode === preset.timeMode &&
        config.scoringOptions.correctWord === preset.scoring.correctWord &&
        config.scoringOptions.missingWord === preset.scoring.missingWord &&
        config.scoringOptions.incorrectSpelling === preset.scoring.incorrectSpelling &&
        config.scoringOptions.punctuationError === preset.scoring.punctuationError &&
        config.scoringOptions.caseError === preset.scoring.caseError
      ) {
        return key;
      }
    }
    return 'custom';
  };

  const currentPreset = getCurrentPresetKey();
  const activePreset = EXAM_PRESETS[currentPreset];

  return (
    <div className="space-y-6">
      {/* Exam Preset Selector */}
      <div className="p-4 bg-white rounded-lg shadow-sm border border-blue-200">
        <h3 className="text-lg font-semibold mb-1">Exam Preset / परीक्षा प्रीसेट</h3>
        <p className="text-sm text-gray-500 mb-4">Select a government exam to auto-configure time, word count, and scoring to match official requirements.</p>

        <select
          value={currentPreset}
          onChange={(e) => applyPreset(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3 font-medium"
        >
          <option value="custom">-- Custom Settings / कस्टम सेटिंग्स --</option>
          <optgroup label="SSC Exams / एसएससी परीक्षाएं">
            <option value="ssc-chsl-english">SSC CHSL - English (35 WPM, 10 min)</option>
            <option value="ssc-chsl-hindi">SSC CHSL - Hindi (30 WPM, 10 min)</option>
            <option value="ssc-cgl-dest">SSC CGL - DEST (15 min, Data Entry)</option>
            <option value="ssc-steno-grade-c">SSC Steno Grade C (40 WPM, 10 min)</option>
            <option value="ssc-steno-grade-d">SSC Steno Grade D (35 WPM, 10 min)</option>
          </optgroup>
          <optgroup label="CPCT (MP) / सीपीसीटी (मध्य प्रदेश)">
            <option value="cpct-english">CPCT - English (30 WPM, 15 min)</option>
            <option value="cpct-hindi">CPCT - Hindi (20 WPM, 15 min)</option>
          </optgroup>
          <optgroup label="Railway / रेलवे">
            <option value="rrb-ntpc-english">RRB NTPC - English (30 WPM, 10 min)</option>
            <option value="rrb-ntpc-hindi">RRB NTPC - Hindi (25 WPM, 10 min)</option>
          </optgroup>
          <optgroup label="High Court / हाई कोर्ट">
            <option value="high-court-clerk">High Court Clerk - English (40 WPM, 10 min)</option>
          </optgroup>
        </select>

        {/* Preset Info Card */}
        {currentPreset !== 'custom' && activePreset && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div>
              <p className="font-semibold text-blue-900 text-sm">{activePreset.name}</p>
              <p className="text-xs text-blue-700">{activePreset.nameHi}</p>
              <p className="text-sm text-blue-800 mt-1">{activePreset.description}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-xs text-blue-700">
                <span className="bg-blue-100 px-2 py-0.5 rounded">Duration: {activePreset.duration} min</span>
                <span className="bg-blue-100 px-2 py-0.5 rounded">Words: {activePreset.wordCount}</span>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded">Correct: {activePreset.scoring.correctWord}</span>
                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">Missing: {activePreset.scoring.missingWord}</span>
                <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded">Spelling: {activePreset.scoring.incorrectSpelling}</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Punctuation: {activePreset.scoring.punctuationError}</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Case: {activePreset.scoring.caseError}</span>
              </div>
            </div>
            {activePreset.officialRef.url && (
              <a
                href={activePreset.officialRef.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 mt-2 underline"
              >
                Official Notification: {activePreset.officialRef.label}
              </a>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scoring Options */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Scoring</h3>

          <div className="space-y-3">
            {[
              { key: 'correctWord' as const, label: 'Correct Word', icon: '✓' },
              { key: 'missingWord' as const, label: 'Missing Word (Penalty)', icon: '✗' },
              { key: 'incorrectSpelling' as const, label: 'Spelling Error (Penalty)', icon: '~' },
              { key: 'punctuationError' as const, label: 'Punctuation Error (Penalty)', icon: '.' },
              { key: 'caseError' as const, label: 'Case Error (Penalty)', icon: 'A' },
            ].map(({ key, label, icon }) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">
                  {icon} {label}
                </label>
                <input
                  type="number"
                  value={config.scoringOptions[key]}
                  onChange={(e) => updateScoring(key, parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Display Settings</h3>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Font Size</label>
              <select
                value={config.displaySettings.fontSize}
                onChange={(e) => updateDisplay('fontSize', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contrast</label>
              <select
                value={config.displaySettings.contrast}
                onChange={(e) => updateDisplay('contrast', e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="border-t pt-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.displaySettings.showGuidePointer}
                  onChange={(e) => updateDisplay('showGuidePointer', e.target.checked)}
                  className="w-4 h-4 mt-0.5"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">Highlight Current Position</span>
                  <p className="text-xs text-gray-500 mt-1">
                    Show color highlighting on reference text based on your typing cursor position
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
