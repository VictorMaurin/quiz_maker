import useQuizAnswerContext from '@/context/useQuizAnswerContext';
import { useState } from 'react';
import { Button } from '../ui/button';

type ListAnswerProps = {
  listAnswer: Array<string>;
  submited: boolean;
  correctAnswer: string;
  questionIndex: number;
};

const ListAnswer = ({
  submited,
  correctAnswer,
  listAnswer,
  questionIndex,
}: ListAnswerProps) => {
  const [answerSelected, setSelectedAnswer] = useState<string | undefined>(
    undefined,
  );

  const { setListUserAnswer, listUserAnswer } = useQuizAnswerContext();

  const selectAnswer = (answer: string) => {
    if (!submited) {
      if (answer === answerSelected) return;
      setListUserAnswer(prev => {
        const newAnswers = [...prev];
        newAnswers[questionIndex] = answer;
        return newAnswers;
      });
      setSelectedAnswer(answer);
    }
  };

  console.log({ listUserAnswer });

  const getAnswerColor = (answer: string) => {
    if (!submited) return answer === answerSelected ? 'bg-green-500' : '';
    const answerFromUser = listUserAnswer[questionIndex];
    console.log({ answerFromUser, correctAnswer, answerSelected });
    if (answer !== answerFromUser && answer !== correctAnswer) return '';
    if (answer === answerFromUser) {
      if (answerFromUser === correctAnswer) return 'bg-green-500';
      return 'bg-red-500';
    } else if (answer === correctAnswer) {
      return 'bg-green-500';
    }
  };
  return (
    <div className="flex gap-4 mt-2 justify-center">
      {listAnswer.map(answer => (
        <Button
          variant={'outline'}
          onClick={() => !submited && selectAnswer(answer)}
          key={answer}
          className={`border-2 border-solid p-2 rounded cursor-pointer hover:bg-gray-200 ${getAnswerColor(answer)}`}
        >
          {answer}
        </Button>
      ))}
    </div>
  );
};

export default ListAnswer;
