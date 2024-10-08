import {IAnswerPayLoad} from './Answer';
export interface IQuestionPayLoad {
  id: number;
  id_question: string;
  id_question_query: string;
  title: string;
  description: string;
  answer_correct: string;
  level_question: string;
  number_question: number;
  created_at: string;
  updated_at: string;
  imageQuestions: String[];
  answers: IAnswerPayLoad[];
  disable?: boolean;
}
