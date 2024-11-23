import { createAction } from '@reduxjs/toolkit';
import { IClassSuccessPayload, ISubject } from '../../interfaces/Class';
import { IQuestionPayLoad } from '../../interfaces/Question';
import { EClassRoomActionType, IChooseSubject, ISetChapterEnable } from './type';
import { IChapter } from '../../interfaces/Subject';


export const getSubjectClassRoomRequest = createAction(
  EClassRoomActionType.GET_SUBJECT_CLASSROOM_REQUEST,
);

export const getSubjectClassRoomSuccess = createAction<IClassSuccessPayload>(
  EClassRoomActionType.GET_SUBJECT_CLASSROOM_SUCCESS,
);

export const getSubjectClassRoomFailure = createAction(
  EClassRoomActionType.GET_SUBJECT_CLASSROOM_FAILURE,
);

export const chooseClassRoom = createAction<Number>(EClassRoomActionType.CHOOSE_CLASSROOM);

export const chooseSubject = createAction<IChooseSubject>(EClassRoomActionType.CHOOSE_SUBJECT);

export const setListQuestionChapter = createAction<IQuestionPayLoad[]>(
  EClassRoomActionType.SET_LIST_QUESTION_CHAPTER,
);

export const setListChapter = createAction<IChapter[]>('ACTION/SET_LIST_CHAPTERS');

export const setChapterEnable = createAction<ISetChapterEnable>(EClassRoomActionType.SET_CHAPTER_ENABLE);
