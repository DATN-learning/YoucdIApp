import {createAction} from '@reduxjs/toolkit';
import {IQuestionPayLoad} from '../../interfaces/Question';

export enum EGameChapterActionType {
  SET_COUNT_DOWN = 'ACTION/SET_COUNT_DOWN',
  SET_STOP_COUNT_DOWN = 'ACTION/SET_STOP_COUNT_DOWN',
  SET_LIST_QUESTION_CHAPTER = 'ACTION/SET_LIST_QUESTION_CHAPTER',
  SET_QUESTION_SELECTED = 'ACTION/SET_QUESTION_SELECTED',
  ADD_QUESTION_ANSWERED = 'ACTION/ADD_QUESTION_ANSWERED',
}

export const setCountDown = createAction<number>(EGameChapterActionType.SET_COUNT_DOWN);
export const setStopCountDown = createAction<boolean>(
  EGameChapterActionType.SET_STOP_COUNT_DOWN,
);

export const setListQuestion = createAction<IQuestionPayLoad[]>(
  EGameChapterActionType.SET_LIST_QUESTION_CHAPTER,
);

export const setQuestionSelected = createAction<number>(
  EGameChapterActionType.SET_QUESTION_SELECTED,
);

export const addQuestionAnswered = createAction<string>(
  EGameChapterActionType.ADD_QUESTION_ANSWERED,
);
