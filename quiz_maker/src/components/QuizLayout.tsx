import { API_ROUTES } from '@/constants/api.constants';
import type { ListCategoryResponse } from '@/types/response';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';

import axios from 'axios';
import SelectQuiz from './quizCreation/SelectQuiz';
import ListQuestion from './quizCreation/ListQuestion';
import useQuizAnswerContext from '@/context/useQuizAnswerContext';

const fetchListCategory = (): Promise<ListCategoryResponse> =>
  axios.get(API_ROUTES.getListCategory).then(res => res.data);

const QuizLayout = () => {
  const { isPending, error, data } = useQuery<ListCategoryResponse>({
    queryKey: ['categories'],
    queryFn: fetchListCategory,
  });
  const { setQuestionParam, refetchQuestions, listQuestions } =
    useQuizAnswerContext();

  const showQuestion = listQuestions?.results.length;

  if (isPending) return <Spinner />;

  if (error) return 'An error has occurred: ' + error.message;
  return (
    <>
      <h1 className="mb-5">QUIZ MAKER</h1>
      <SelectQuiz
        listCategory={data.trivia_categories}
        handleSetQuestionParams={setQuestionParam}
        onSumbit={() => refetchQuestions()}
      />
      {showQuestion ? (
        <ListQuestion data={listQuestions!} submited={false} />
      ) : (
        <></>
      )}
    </>
  );
};

export default QuizLayout;
