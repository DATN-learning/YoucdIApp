import { createReducer } from '@reduxjs/toolkit';
import {
  getSubjectClassRoomFailure,
  getSubjectClassRoomRequest,
  getSubjectClassRoomSuccess,
  chooseClassRoom,
  chooseSubject,
  setListQuestionChapter,
  setChapterEnable,
} from './actions';
import { IClass, ISubject } from '../../interfaces/Class';
import { IQuestionPayLoad } from '../../interfaces/Question';
import { setListChapter } from './actions';
import { IChapter } from '../../interfaces/Subject';
import { ILessionByChapterPayLoad } from '../../interfaces/Lession';
interface IinitialState {
  loading: boolean;
  numberClassRoom: number;
  subjectEnable: {
    name: string;
    id: string;
    id_relation: number;
  };
  listchapter: {
    id: number;
    id_chapter_subject: string;
    subject_id: number;
    name_chapter_subject: string;
    chapter_image: string;
    slug: string;
    created_at: string;
    updated_at: string;
    number_chapter: number;
    // lessions: ILessionByChapterPayLoad[];
  },
  chapterEnable: {
    id: number;
    name: string;
    number: number;
  };
  listClass: IClass[];
  listQuestionChapter: IQuestionPayLoad[];
}

const initialState: IinitialState = {
  loading: true,
  numberClassRoom: 6, //test
  subjectEnable: {
    name: '',
    id: '',
    id_relation: -1,
  },
  listchapter: {
    id: 0,
    id_chapter_subject: '',
    subject_id: 0,
    name_chapter_subject: '',
    chapter_image: '',
    slug: '',
    created_at: '',
    updated_at: '',
    number_chapter: 0,
    // lessions: ILessionByChapterPayLoad[],
  },
  chapterEnable: {
    id: 0,
    name: '',
    number: 0,
  },
  listClass: [],
  listQuestionChapter: [],

};

export const ClassRoomReducer = createReducer(initialState, {
  [getSubjectClassRoomRequest.type]: state => {
    state.loading = true;
  },
  [getSubjectClassRoomSuccess.type]: (state, action) => {
    state.listClass = action.payload;
    state.loading = false;
  },
  [getSubjectClassRoomFailure.type]: state => {
    state.loading = false;
  },
  [chooseClassRoom.type]: (state, action) => {
    state.numberClassRoom = action.payload;
  },
  [chooseSubject.type]: (state, action) => {
    state.subjectEnable = {
      name: action.payload.name,
      id: action.payload.id,
      id_relation: action.payload.id_relation,
    };
  },
  [setListQuestionChapter.type]: (state, action) => {
    state.listQuestionChapter = action.payload;
  },

  [setChapterEnable.type]: (state, action) => {
    state.chapterEnable = {
      id: action.payload.id,
      name: action.payload.name,
      number: action.payload.number,
    };
  },
  [setListChapter.type]: (state, action) => {
    state.listchapter = action.payload; // Cập nhật danh sách môn học
  },
});
