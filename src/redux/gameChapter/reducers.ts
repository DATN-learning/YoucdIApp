import {createReducer} from '@reduxjs/toolkit';
import {IQuestionPayLoad} from '../../interfaces/Question';
import {
  setCountDown,
  setStopCountDown,
  setListQuestion,
  setQuestionSelected,
  addQuestionAnswered,
} from './actions';
interface IinitialState {
  countDown: number;
  stopCountDown: boolean;
  idQuestionSelected: number;
  listQuestion: IQuestionPayLoad[];
  listQuestionAnswered: string[];
}

const initialState: IinitialState = {
  countDown: 10,
  stopCountDown: false,
  idQuestionSelected: 0,
  listQuestion: [],
  listQuestionAnswered: [],
};
export const GameChapterReducer = createReducer(initialState, {
  [setCountDown.type]: (state, action) => {
    state.countDown = action.payload;
  },
  [setStopCountDown.type]: (state, action) => {
    state.stopCountDown = action.payload;
  },
  [setListQuestion.type]: (state, action) => {
    state.listQuestion = action.payload;
  },
  [setQuestionSelected.type]: (state, action) => {
    state.idQuestionSelected = action.payload;
  },
  [addQuestionAnswered.type]: (state, action) => {
    state.listQuestionAnswered = [...state.listQuestionAnswered, action.payload];
  },
});
