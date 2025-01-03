import {IPdf} from './pdf';
import {IQuestionPayLoad} from './Question';
export interface ILession {
  id: number;
  id_lesstion_chapter: string;
  chapter_subject_id: number;
  name_lesstion_chapter: string;
  description_lesstion_chapter: string;
  number_lesstion_chapter: number;
  created_at: string;
  updated_at: string;
  pdfFiles: IPdf[];
  questions: IQuestionPayLoad[];
}

export interface ILessionByChapterPayLoad {
  id: number;
  id_lesstion_chapter: string;
  chapter_subject_id: number;
  name_lesstion_chapter: string;
  description_lesstion_chapter: string;
  number_lesstion_chapter: number;
  created_at: string;
  updated_at: string;
}

export interface ILessionPayLoad {
  status: boolean;
  message: string;
  data: {
    lession: ILession;
  };
}
