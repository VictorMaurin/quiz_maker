import { useContext } from 'react';
import { QuizAnswerContext } from './QuizAnswerContext';

const useQuizAnswerContext = () => {
  const context = useContext(QuizAnswerContext);
  if (!context) {
    throw new Error(
      'useQuizAnswerContext must be used within a QuizAnswerContextProvider',
    );
  }
  return context;
};
export default useQuizAnswerContext;
