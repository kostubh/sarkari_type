import { TestProvider, useTest } from './context/TestContext';
import { PreTestScreen } from './components/PreTest/PreTestScreen';
import { DuringTestScreen } from './components/DuringTest/DuringTestScreen';
import { PostTestScreen } from './components/PostTest/PostTestScreen';

function AppContent() {
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
    <TestProvider>
      <AppContent />
    </TestProvider>
  );
}
