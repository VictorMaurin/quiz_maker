export const API_ROUTES = {
    getListCategory: 'https://opentdb.com/api_category.php',
    getQuestions: (category: number, difficulty: string) => `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
} as const;