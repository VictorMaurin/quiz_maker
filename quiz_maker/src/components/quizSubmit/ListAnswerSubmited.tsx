import useQuizAnswerContext from '@/context/useQuizAnswerContext';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import ListQuestion from '../quizCreation/ListQuestion';

const ListAnswerSubmited = () => {
  const {
    listQuestions,
    setQuestionParam,
    clearData,
    listUserAnswer,
    setListUserAnswer,
  } = useQuizAnswerContext();
  const goodAnswers =
    listQuestions?.results.filter(
      (question, questionIndex) =>
        question.correct_answer === listUserAnswer[questionIndex],
    ).length || 0;

  const getColor = () => {
    if (goodAnswers < 2) return 'bg-red-500';
    if (goodAnswers < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const onSumbit = () => {
    setQuestionParam({ categoryId: 0, difficulty: '' });
    setListUserAnswer([]);
    clearData();
  };
  if (!listQuestions) return null;

  return (
    <div className="flex flex-col items-center">
      <ListQuestion data={listQuestions} submited={true} />
      <div
        className={`w-50 text-center font-bold ${getColor()} text-white p-2 mb-4 mt-4`}
      >
        You scored {goodAnswers} out of {listQuestions?.results.length}
      </div>
      <Link to="/">
        <Button onClick={onSumbit} className="w-50">
          Create a new quiz
        </Button>
      </Link>
    </div>
  );
};

export default ListAnswerSubmited;
