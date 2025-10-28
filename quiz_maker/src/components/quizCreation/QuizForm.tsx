import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import type { ListCategory } from '@/types/category';
import { listDifficulty } from '@/constants/quiz.constant';
import type { QuestionParam } from '@/types/question';

type SelectQuizProps = {
  listCategory: ListCategory;
  handleSetQuestionParams: React.Dispatch<React.SetStateAction<QuestionParam>>;
  onSumbit: () => void;
};

const QuizForm = ({
  listCategory,
  handleSetQuestionParams,
  onSumbit,
}: SelectQuizProps) => {
  return (
    <div className="flex justify-center items-center">
      <Select
        onValueChange={value =>
          handleSetQuestionParams(prevState => ({
            ...prevState,
            categoryId: Number(value),
          }))
        }
      >
        <SelectTrigger id="categorySelect" className="w-[180px]">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {listCategory.map(category => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        onValueChange={value =>
          handleSetQuestionParams(prevState => ({
            ...prevState,
            difficulty: value,
          }))
        }
      >
        <SelectTrigger id="difficultySelect" className="w-[180px]">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          {listDifficulty.map(difficulty => (
            <SelectItem key={difficulty} value={difficulty}>
              {difficulty}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button id="createBtn" onClick={onSumbit}>
        Create
      </Button>
    </div>
  );
};

export default QuizForm;
