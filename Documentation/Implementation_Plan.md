# SarkariType - Implementation Plan

## Overview
A React-based typing test application with AI-generated text, real-time analytics, and professional PDF report export. Hosted free on GitHub Pages with a Cloudflare Worker for secure API calls.

---

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS |
| State | React Context API |
| PDF Export | jsPDF + html2canvas |
| AI Text API | Cloudflare Workers (free) → Perplexity Sonar |
| Hosting | GitHub Pages (free) |

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    GitHub Pages (Free)                   │
│  ┌─────────────────────────────────────────────────┐    │
│  │              React + Vite Frontend               │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐    │    │
│  │  │ Pre-Test │ │  During  │ │  Post-Test   │    │    │
│  │  │  Screen  │ │   Test   │ │   Results    │    │    │
│  │  └──────────┘ └──────────┘ └──────────────┘    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          │ API call for AI text
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Cloudflare Workers (Free Tier)              │
│         Proxies requests to Perplexity Sonar API         │
│              (Hides your API key securely)               │
└─────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
/sarkari-type/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   └── Modal.tsx
│   │   ├── PreTest/         # Configuration screen
│   │   │   ├── PreTestScreen.tsx
│   │   │   ├── TimeConfig.tsx
│   │   │   ├── TextSourceConfig.tsx
│   │   │   └── ScoringConfig.tsx
│   │   ├── DuringTest/      # Active typing screen
│   │   │   ├── DuringTestScreen.tsx
│   │   │   ├── ReferenceText.tsx
│   │   │   ├── TypingInput.tsx
│   │   │   ├── StatsBar.tsx
│   │   │   └── ControlButtons.tsx
│   │   ├── PostTest/        # Results screen
│   │   │   ├── PostTestScreen.tsx
│   │   │   ├── ResultSummary.tsx
│   │   │   ├── TextComparison.tsx
│   │   │   └── PDFExport.tsx
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── context/
│   │   └── TestContext.tsx  # Central state management
│   ├── hooks/
│   │   ├── useTimer.ts      # High-precision timer
│   │   ├── useTypingStats.ts
│   │   └── useTextSource.ts
│   ├── utils/
│   │   ├── scoring.ts       # Score calculation
│   │   ├── wpmCalculation.ts # WPM algorithm
│   │   ├── textComparison.ts # Character matching
│   │   └── pdfGenerator.ts  # PDF export logic
│   ├── services/
│   │   └── textApi.ts       # AI & Wikipedia API calls
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── worker/                   # Cloudflare Worker
│   ├── wrangler.toml
│   └── src/index.ts
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Implementation Phases

### Phase 1: Project Setup
**Files to create:**
- `sarkari-type/package.json`
- `sarkari-type/vite.config.ts`
- `sarkari-type/tailwind.config.js`
- `sarkari-type/tsconfig.json`
- `sarkari-type/src/types/index.ts`

**Tasks:**
1. Initialize Vite + React + TypeScript project
2. Install: `tailwindcss`, `jspdf`, `html2canvas`
3. Configure Tailwind CSS
4. Create TypeScript type definitions

---

### Phase 2: Core State & Hooks
**Files to create:**
- `sarkari-type/src/context/TestContext.tsx`
- `sarkari-type/src/hooks/useTimer.ts`
- `sarkari-type/src/hooks/useTypingStats.ts`
- `sarkari-type/src/utils/wpmCalculation.ts`
- `sarkari-type/src/utils/textComparison.ts`
- `sarkari-type/src/utils/scoring.ts`

**Key algorithms (adapted from MonkeyType):**

#### WPM Calculation
```typescript
// Standard formula: 1 word = 5 characters
WPM = (correctChars + correctSpaces) * (60 / seconds) / 5
```

#### Timer Precision
```typescript
// Using performance.now() for sub-millisecond accuracy
const elapsed = (performance.now() - startTime) / 1000;
```

#### Character Matching
- Compares each character position
- Categorizes errors: spelling, punctuation, case, missing, extra

---

### Phase 3: Pre-Test Screen
**Files to create:**
- `sarkari-type/src/components/PreTest/PreTestScreen.tsx`
- `sarkari-type/src/components/PreTest/TimeConfig.tsx`
- `sarkari-type/src/components/PreTest/TextSourceConfig.tsx`
- `sarkari-type/src/components/PreTest/ScoringConfig.tsx`

**Features:**
| Setting | Options |
|---------|---------|
| Time Mode | Timed (1-60 min) or Timeless |
| Text Source | AI Generated, Wikipedia, Custom Paste |
| AI Topics | Diplomatic letter, formal email, news article, etc. |
| Scoring | Configurable points for correct/incorrect/missing |

---

### Phase 4: During-Test Screen (Core Feature)
**Files to create:**
- `sarkari-type/src/components/DuringTest/DuringTestScreen.tsx`
- `sarkari-type/src/components/DuringTest/ReferenceText.tsx`
- `sarkari-type/src/components/DuringTest/TypingInput.tsx`
- `sarkari-type/src/components/DuringTest/StatsBar.tsx`
- `sarkari-type/src/components/DuringTest/ControlButtons.tsx`

**Features:**
- Scrollable reference text at top of screen
- Real-time stats updated every second:
  - Words per minute (WPM)
  - Countdown/elapsed timer
  - Correct words count
  - Mistakes count
- Timer auto-starts on first keystroke
- Pause/Resume/Submit/Reset buttons
- Fullscreen mode toggle
- Adjustable display settings:
  - Font size (small/medium/large)
  - Text color
  - Contrast (low/medium/high)
  - Reference text guide pointer on/off
- Auto-submit when timer expires

---

### Phase 5: Post-Test Screen
**Files to create:**
- `sarkari-type/src/components/PostTest/PostTestScreen.tsx`
- `sarkari-type/src/components/PostTest/ResultSummary.tsx`
- `sarkari-type/src/components/PostTest/TextComparison.tsx`
- `sarkari-type/src/components/PostTest/PDFExport.tsx`
- `sarkari-type/src/utils/pdfGenerator.ts`

**Features:**
- Congratulations message
- Final statistics display:
  - WPM
  - Accuracy percentage
  - Total score
  - Time taken
  - Correct/incorrect word counts
- Side-by-side text comparison with color-coded errors:
  | Color | Meaning |
  |-------|---------|
  | Green | Correct |
  | Red | Spelling error |
  | Orange | Punctuation error |
  | Yellow | Case error |
  | Gray strikethrough | Missing word |
- Professional PDF download with:
  - Header with logo/title
  - Test date and configuration
  - All statistics
  - Visual comparison snapshot
  - Clean, printable formatting

---

### Phase 6: API Integration
**Files to create:**
- `sarkari-type/worker/src/index.ts` (Cloudflare Worker)
- `sarkari-type/worker/wrangler.toml`
- `sarkari-type/src/services/textApi.ts`

**Cloudflare Worker** (hides your API key):
```typescript
// Receives request from frontend
// Adds your Perplexity API key (stored as secret)
// Forwards to Perplexity Sonar API
// Returns generated text to frontend
```

**Text Sources:**
1. **AI (Perplexity Sonar)**: Generate custom paragraphs on topics
2. **Wikipedia**: Fetch random article summaries via REST API
3. **Custom**: User pastes their own text

---

### Phase 7: Polish & Deploy
**Files to create:**
- `sarkari-type/.github/workflows/deploy.yml`

**Tasks:**
1. Responsive design for mobile/tablet
2. Keyboard accessibility (tab navigation, focus states)
3. Loading states and error handling
4. GitHub Pages deployment with automatic CI/CD

---

## Key Type Definitions

```typescript
// Test Configuration (set in Pre-Test)
interface TestConfig {
  timeMode: 'timed' | 'timeless';
  duration: number;  // seconds (0 for timeless)
  textSource: 'ai' | 'wikipedia' | 'custom';
  aiTopic: string;
  customText: string;
  scoringOptions: {
    correctWord: number;       // +10 default
    missingWord: number;       // -5 default
    incorrectSpelling: number; // -2 default
    punctuationError: number;  // -1 default
    caseError: number;         // -1 default
  };
  displaySettings: {
    fontSize: 'small' | 'medium' | 'large';
    contrast: 'low' | 'medium' | 'high';
    showGuidePointer: boolean;
  };
}

// Test State (managed during test)
interface TestState {
  phase: 'pre' | 'during' | 'post';
  isFullscreen: boolean;
  isPaused: boolean;
  referenceText: string;
  referenceWords: string[];
  typedText: string;
  typedWords: string[];
  currentWordIndex: number;
  startTime: number;
  elapsedSeconds: number;
  wpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  missedChars: number;
  finalScore: number;
  wordResults: WordResult[];
}

// Individual Word Result (for comparison display)
interface WordResult {
  reference: string;
  typed: string;
  status: 'correct' | 'incorrect' | 'missing' | 'extra';
  errors: ErrorDetail[];
}

interface ErrorDetail {
  type: 'spelling' | 'punctuation' | 'case' | 'missing' | 'extra';
  position: number;
  expected: string;
  actual: string;
}
```

---

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.4.14",
    "gh-pages": "^5.0.0",
    "postcss": "^8.4.24",
    "tailwindcss": "^3.3.2",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}
```

---

## Verification Plan

### Automated Testing
- Unit tests for WPM calculation
- Unit tests for text comparison logic
- Unit tests for scoring algorithm

### Manual Testing Checklist
- [ ] Pre-Test: All config options save correctly
- [ ] Pre-Test: AI text generation works
- [ ] Pre-Test: Wikipedia fetch works
- [ ] Pre-Test: Custom text paste works
- [ ] During-Test: Timer starts on first keystroke
- [ ] During-Test: Timer is accurate (within 100ms)
- [ ] During-Test: Stats update every second
- [ ] During-Test: Pause/Resume works correctly
- [ ] During-Test: Auto-submit on timer expiry
- [ ] During-Test: Fullscreen toggle works
- [ ] Post-Test: All stats display correctly
- [ ] Post-Test: Error highlighting is accurate
- [ ] Post-Test: PDF downloads successfully
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] Responsive: Mobile and tablet layouts

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Perplexity API rate limits | Cache responses, provide fallback sample texts |
| Timer drift on slow devices | Self-correcting timer using `performance.now()` |
| PDF rendering issues | Test html2canvas across browsers, provide fallback |
| GitHub Pages 404 on refresh | Add 404.html with redirect script |
| Large text performance | Virtualize long reference text, debounce stats updates |

---

## Questions to Confirm Before Starting

1. **Branding**: What name/logo do you want for the app? "SarkariType" or something else?
2. **Default scoring**: Are the default point values reasonable? (+10 correct, -5 missing, -2 spelling, -1 punctuation, -1 case)
3. **AI topics**: What specific text generation topics do you want? (Diplomatic letter, formal email, etc.)
4. **Color scheme**: Any preferred colors for the UI?

---

## Next Steps

Once you approve this plan, I will:
1. Create the `/sarkari-type` folder
2. Initialize the React + Vite + TypeScript project
3. Set up Tailwind CSS
4. Begin implementing Phase 1 → Phase 7 in order

**Estimated file count**: ~25 files
**Core complexity**: Medium (typing logic and real-time updates are the trickiest parts)
