import { API_ROUTES } from '@/constants/api.constants';
import type { ListQuestionResponse, QuestionParam } from '@/types/question';
import { shuffle } from '@/utils/array';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { createContext, type ReactNode, useMemo, useState } from 'react';

type QuizContextType = {
  submited: boolean;
  setSubmited: (submited: boolean) => void;
  refetchQuestions: () => void;
  listQuestions?: ListQuestionResponse;
  setQuestionParam: React.Dispatch<React.SetStateAction<QuestionParam>>;
  clearData: () => void;
  ListQuestionWithshuffledAnswers?:
    | {
        question: string;
        correctAnswer: string;
        listShuffledAnswer: string[];
      }[]
    | undefined;
  listUserAnswer: string[];
  setListUserAnswer: React.Dispatch<React.SetStateAction<string[]>>;
};

const fetchListQuestions = (
  categoryId: number,
  difficulty: string,
): Promise<ListQuestionResponse> =>
  axios
    .get(API_ROUTES.getQuestions(categoryId, difficulty))
    .then(res => res.data);

// eslint-disable-next-line react-refresh/only-export-components
export const QuizAnswerContext = createContext<QuizContextType | null>(null);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [questionParam, setQuestionParam] = useState<QuestionParam>({
    difficulty: 'easy',
    categoryId: 0,
  });
  const [submited, setSubmited] = useState<boolean>(false);
  const { data: questionData, refetch } = useQuery({
    queryKey: ['questions'],
    gcTime: 0,
    queryFn: () =>
      fetchListQuestions(questionParam.categoryId, questionParam.difficulty),
    enabled: false,
    staleTime: 0,
  });
  const [listUserAnswer, setListUserAnswer] = useState<string[]>(
    questionData ? new Array(questionData.results.length) : [],
  );

  const ListQuestionWithshuffledAnswers = useMemo(
    () =>
      questionData?.results.map(listQuestions => ({
        question: listQuestions.question,
        correctAnswer: listQuestions.correct_answer,
        listShuffledAnswer: shuffle([
          listQuestions.correct_answer,
          ...listQuestions.incorrect_answers,
        ]),
      })),
    [questionData],
  );

  const clearData = () => {
    queryClient.removeQueries({ queryKey: ['questions'] });
  };
  return (
    <QuizAnswerContext.Provider
      value={{
        listUserAnswer,
        setListUserAnswer,
        submited,
        setSubmited,
        listQuestions: questionData,
        refetchQuestions: refetch,
        setQuestionParam,
        clearData,
        ListQuestionWithshuffledAnswers,
      }}
    >
      {children}
    </QuizAnswerContext.Provider>
  );
};
