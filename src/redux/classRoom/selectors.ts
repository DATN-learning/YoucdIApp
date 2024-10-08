import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../reducers';

const classSelector = (state: RootState) => state.classRoom;

export const getSubjectClass = createSelector(
  classSelector,
  classState => classState,
);
export const chooseClassRoom = createSelector(
  classSelector,
  classState => classState.numberClassRoom,
);
export const chooseSubject = createSelector(
  classSelector,
  classState => classState.subjectEnable,
);

export const getListQuestionChapter = createSelector(
  classSelector,
  classState => classState.listQuestionChapter,
);

export const getChapterEnable = createSelector(
  classSelector,
  classState => classState.chapterEnable,
);
