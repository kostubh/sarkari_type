# SarkariType - Master Your Typing Skills

A modern typing test application built with React, TypeScript, and Tailwind CSS. Practice typing with AI-generated text, get real-time analytics, and download professional reports.

## Features

- ⏱️ **Flexible Time Settings**: Test for fixed duration (30s - 10min) or timeless mode
- 📝 **Multiple Text Sources**:
  - AI-generated text via Perplexity Sonar API (multiple topics)
  - Random Wikipedia articles
  - Custom user-provided text
- 📊 **Real-Time Analytics**:
  - Words per minute (WPM)
  - Accuracy percentage
  - Error count
  - Live timer
- ⭐ **Customizable Scoring**:
  - Points for correct words
  - Penalties for errors (spelling, punctuation, case, missing)
- 👁️ **Display Customization**:
  - Font size (small/medium/large)
  - Contrast levels
  - Guide pointer indicator
- 📄 **Professional PDF Reports**:
  - Detailed test results
  - Configuration used
  - Side-by-side text comparison with color-coded errors
- 🖥️ **Fullscreen Mode** for distraction-free typing
- 📱 **Responsive Design** for desktop and tablet

## Getting Started

### Prerequisites

- Node.js 18+ (for local development)
- npm or pnpm package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sarkari-type.git
   cd sarkari-type/sarkari-type
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```
   Output will be in the `dist` folder

## GitHub Pages Deployment

This project automatically deploys to GitHub Pages when you push to the `main` or `master` branch.

### Setup (One-Time)

1. **Make repository public** (required for free GitHub Pages)
   - Go to Settings → Visibility → Change to Public

2. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Under "Build and deployment", select "GitHub Actions" as source

3. **Deploy**
   - Push changes: `git push`
   - GitHub Actions automatically builds and deploys
   - Visit: `https://yourusername.github.io/sarkari-type`

### After Setup

Every time you push changes:
1. Push to GitHub: `git push`
2. GitHub Actions builds automatically
3. Visit your site URL to see changes (may take 1-2 minutes)

See [GITHUB_PAGES_SETUP.md](../Documentation/GITHUB_PAGES_SETUP.md) for detailed instructions.

## Project Structure

```
sarkari-type/
├── src/
│   ├── components/
│   │   ├── PreTest/          # Test configuration
│   │   ├── DuringTest/       # Active typing interface
│   │   └── PostTest/         # Results and feedback
│   ├── context/
│   │   └── TestContext.tsx   # State management
│   ├── hooks/
│   │   ├── useTimer.ts       # High-precision timer
│   │   └── useTypingStats.ts # Real-time stats calculation
│   ├── utils/
│   │   ├── wpmCalculation.ts # WPM algorithm
│   │   ├── textComparison.ts # Character matching
│   │   ├── scoring.ts        # Score calculation
│   │   └── pdfGenerator.ts   # PDF export
│   ├── services/
│   │   └── textApi.ts        # Text generation services
│   ├── types/
│   │   └── index.ts          # TypeScript definitions
│   └── App.tsx               # Main component
├── package.json              # Dependencies
├── vite.config.ts           # Build configuration
└── tailwind.config.js       # Tailwind CSS configuration
```

## Key Algorithms

### WPM Calculation
```typescript
WPM = (correctChars + correctSpaces) * (60 / testSeconds) / 5
```
Where 1 word = 5 characters (standard typing convention)

### Accuracy
```typescript
Accuracy = (correctChars / (correctChars + incorrectChars)) * 100
```

### Timer Precision
Uses `performance.now()` for sub-millisecond accuracy and self-correcting updates every ~16ms.

## API Integration

### Text Generation
- **AI Text**: Uses Perplexity Sonar API (requires API key)
- **Wikipedia**: Fetches via Wikipedia REST API (free, no key needed)
- **Custom**: User-provided text

**Note**: API key should be stored as a GitHub Secret, not in code.

## Customization

### Modifying Scoring Points
Edit the scoring defaults in `src/types/index.ts`:
```typescript
scoringOptions: {
  correctWord: 10,           // Points per correct word
  missingWord: -5,           // Penalty for missing word
  incorrectSpelling: -2,     // Penalty per spelling error
  punctuationError: -1,      // Penalty per punctuation error
  caseError: -1,             // Penalty per case error
}
```

### Adding New Text Topics
Add topics to `src/services/textApi.ts`:
```typescript
const AI_TOPICS = [
  'Technology',
  'Your New Topic',  // Add here
];
```

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lightweight: ~50KB gzipped
- Fast load times with Vite optimization
- Efficient real-time stats updates
- Smooth animations and transitions

## Known Limitations

- Requires modern browser with ES2020 support
- PDF generation works best on desktop browsers
- Large texts (>5000 words) may have slight UI lag

## Troubleshooting

### Timer seems slow?
- Ensure no heavy processes running on your computer
- Close other browser tabs
- Try a different browser

### PDF download fails?
- Check browser console for errors
- Ensure sufficient disk space
- Try a different browser

### Typing feels laggy?
- Disable guide pointer in settings
- Reduce contrast level
- Close other applications

## Future Enhancements

- [ ] User accounts and progress tracking
- [ ] Leaderboards
- [ ] Custom themes
- [ ] Advanced statistics (consistency, key timing, etc.)
- [ ] Mobile app version
- [ ] Keyboard layout practice modes

## Contributing

This is a personal project, but improvements are welcome! Feel free to:
1. Report bugs via GitHub Issues
2. Suggest features
3. Submit pull requests

## License

MIT License - feel free to use this project for learning and personal practice.

## Support

For issues, questions, or feedback:
1. Check [GITHUB_PAGES_SETUP.md](../Documentation/GITHUB_PAGES_SETUP.md)
2. Open a GitHub Issue
3. Check browser console for error messages

---

**Built with React | Vite | Tailwind CSS | TypeScript**

Happy typing! 🚀
