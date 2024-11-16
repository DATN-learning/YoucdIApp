import { IAnswerPayLoad } from "../../interfaces/Answer";
import { IQuestionPayLoad } from "../../interfaces/Question";

export interface ItemQuestionGameProps {
    data: IQuestionPayLoad;
    index: number;
    onAnswerSelected: (answer: { question_id: string; answer_id: string; is_correct: boolean }) => void;
}

export interface AnswerQuestionGameProps {
    color: string;
    item : IAnswerPayLoad;
    onClick: (id:string) => void;
    isAnswerCorrect : boolean;
    isChoose : boolean;
}