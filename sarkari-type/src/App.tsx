import { Routes, Route } from 'react-router-dom';
import { TestProvider, useTest } from './context/TestContext';
import { PreTestScreen } from './components/PreTest/PreTestScreen';
import { DuringTestScreen } from './components/DuringTest/DuringTestScreen';
import { PostTestScreen } from './components/PostTest/PostTestScreen';
import { ExamsOverview } from './pages/ExamsOverview';
import { SscChsl } from './pages/SscChsl';
import { SscCgl } from './pages/SscCgl';
import { Cpct } from './pages/Cpct';
import { RrbNtpc } from './pages/RrbNtpc';
import { HighCourt } from './pages/HighCourt';
import { SscSteno } from './pages/SscSteno';

function TypingTestApp() {
  const { testState } = useTest();

  return (
    <div className="min-h-screen bg-gray-100">
      {testState.phase === 'pre' && <PreTestScreen />}
      {testState.phase === 'during' && <DuringTestScreen />}
      {testState.phase === 'post' && <PostTestScreen />}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestProvider><TypingTestApp /></TestProvider>} />
      <Route path="/exams" element={<ExamsOverview />} />
      <Route path="/exams/ssc-chsl" element={<SscChsl />} />
      <Route path="/exams/ssc-cgl" element={<SscCgl />} />
      <Route path="/exams/cpct" element={<Cpct />} />
      <Route path="/exams/rrb-ntpc" element={<RrbNtpc />} />
      <Route path="/exams/high-court" element={<HighCourt />} />
      <Route path="/exams/ssc-steno" element={<SscSteno />} />
    </Routes>
  );
}
