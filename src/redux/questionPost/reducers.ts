import {createReducer} from '@reduxjs/toolkit';
import {setIdPostEnable, setPostEnable} from './actions';
import {IPost} from '../../interfaces/Post';
import {getQuestionPostByID} from './api';
interface IinitialState {
  loading: boolean;
  idPostEnable: string;
  postEnable: IPost;
}

const initialState: IinitialState = {
  loading: true,
  idPostEnable: '',
  postEnable: {} as IPost,
};

export const QuestionPostReducer = createReducer(initialState, {
  [setIdPostEnable.type]: (state, action) => {
    state.idPostEnable = action.payload;
  },
  [setPostEnable.type]: (state, action) => {
    state.postEnable = action.payload;
  },
});
