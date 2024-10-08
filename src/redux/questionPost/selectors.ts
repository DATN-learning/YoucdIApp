import {createSelector} from '@reduxjs/toolkit';
import type {RootState} from '../reducers';

const questionPostSelector = (state: RootState) => state.questionPost;

export const getIdPostEnable = createSelector(
  questionPostSelector,
  questionPostState => questionPostState.idPostEnable,
);

export const getPostEnable = createSelector(
  questionPostSelector,
  questionPostState => questionPostState.postEnable,
);
