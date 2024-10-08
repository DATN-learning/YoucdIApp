import { IAnswerPayLoad } from "../../interfaces/Answer";
import { IQuestionPayLoad } from "../../interfaces/Question";

export interface ItemQuestionGameProps {
    data: IQuestionPayLoad;
    index: number;
}

export interface AnswerQuestionGameProps {
    color: string;
    item : IAnswerPayLoad;
    onClick: (id:string) => void;
    isAnswerCorrect : boolean;
    isChoose : boolean;
}