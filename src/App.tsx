import { ChatWindow } from './components/chat';
import { SpeechProvider } from './contexts/SpeechContext';

function App() {
  return (
    <SpeechProvider>
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600 via-teal-500/30 to-white" />
          <div className="absolute inset-0 bg-white/50" />
        </div>
        <div className="relative z-10">
          <ChatWindow />
        </div>
      </div>
    </SpeechProvider>
  );
}

export default App;