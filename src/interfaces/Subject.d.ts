import {ISubject} from './Class';
import {ILessionByChapterPayLoad} from './Lession';
import { IQuestionPayLoad } from './Question';
export interface IChapter {
  id: number;
  id_chapter_subject: string;
  subject_id: number;
  name_chapter_subject: string;
  chapter_image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  number_chapter: number;
  lessions: ILessionByChapterPayLoad[];
}

export interface IChapters {
  id: number;
  id_chapter_subject: string;
  subject_id: number;
  name_chapter_subject: string;
  chapter_image: string;
  slug: string;
  created_at: string;
  updated_at: string;
  number_chapter: number;
  lessions: ILessionByChapterPayLoad;
}

export interface IChapterSubjectSuccessPayload {
  status: boolean;
  message: string;
  data: {
    chapter: IChapter[];
  };
}export interface IChapterSubjectSuccessPayloads {
  status: boolean;
  data: {
    recommendations : IChapterLessonData[];
  }
}

export interface IChapterLessonData {
  chapter: IChapters;
  lesson: ILessionByChapterPayLoad; 
}

export interface IChapterWithoutExercises {
  id: number;
  id_chapter_subject: string;
  subject_id: number;
  name_chapter_subject: string;
  slug: string;
  created_at: string;
  updated_at: string;
  number_chapter: number;
  questions: IQuestionPayLoad[];
}
export interface IChapterExercisesSuccessPayload {
  status: boolean;
  message: string;
  data: {
    chapters: IChapterWithoutExercises[];
  };
}
