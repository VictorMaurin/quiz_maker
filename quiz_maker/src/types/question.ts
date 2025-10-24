
export type QuestionParam = {
    difficulty:  string
    categoryId: number
}

export type QuestionFromAPI = {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export type ListQuestionResponse = {
    results: Array<QuestionFromAPI>
}