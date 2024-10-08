import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../reducers';
const gameChapterSelector = (state: RootState) => state.gameChapter;
export const getCountDown = createSelector(
  gameChapterSelector,
  gameChapterState => gameChapterState.countDown,
);

export const getStopCountDown = createSelector(
  gameChapterSelector,
  gameChapterState => gameChapterState.stopCountDown,
);
export const getListQuestion = createSelector(
  gameChapterSelector,
  gameChapterState => gameChapterState.listQuestion,
);
export const getIdQuestionSelected = createSelector(
  gameChapterSelector,
  gameChapterState => gameChapterState.idQuestionSelected,
);
export const getListQuestionAnswered = createSelector(
  gameChapterSelector,
  gameChapterState => gameChapterState.listQuestionAnswered,
);
