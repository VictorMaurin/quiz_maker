import type { ListQuestionResponse } from '@/types/question';
import ListAnswer from './ListAnswer';
import { Button } from '../ui/button';
import { Link } from 'react-router';
import useQuizAnswerContext from '@/context/useQuizAnswerContext';

type ListQuestionProps = {
  data: ListQuestionResponse;
  submited: boolean;
};

const ListQuestion = ({ data, submited }: ListQuestionProps) => {
  const { ListQuestionWithshuffledAnswers, listUserAnswer } =
    useQuizAnswerContext();

  if (!ListQuestionWithshuffledAnswers) return null;

  return (
    <div className="flex space-between flex-col">
      {ListQuestionWithshuffledAnswers.map((question, questionIndex) => (
        <div key={question.question} className="mb-5 flex flex-col">
          <span>{question.question}</span>
          <ListAnswer
            questionIndex={questionIndex}
            listAnswer={[...question.listShuffledAnswer]}
            submited={submited}
            correctAnswer={question.correctAnswer}
          />
        </div>
      ))}
      {!submited &&
        listUserAnswer.filter(res => res).length === data.results.length && (
          <Link to="/quiz_answer">
            <Button className="text-center font-bold w-[100px] flex mx-auto">
              Submit
            </Button>
          </Link>
        )}
    </div>
  );
};

export default ListQuestion;
