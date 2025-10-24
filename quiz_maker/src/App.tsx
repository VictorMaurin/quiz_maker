import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import QuizLayout from './components/QuizLayout';
import { QuizProvider } from './context/QuizAnswerContext';
import ListAnswerSubmited from './components/quizAnswer/ListAnswerSubmited';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <QuizProvider>
          <Routes>
            <Route path="/" element={<QuizLayout />} />
            <Route path="/quiz_answer" element={<ListAnswerSubmited />} />
          </Routes>
        </QuizProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
