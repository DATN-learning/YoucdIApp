import {createAction} from '@reduxjs/toolkit';
import { IPost } from '../../interfaces/Post';

export enum EPostActionType {
    SET_ID_POST_ENABLE = 'ACTION/SET_ID_POST_ENABLE',
    SET_POST_ENABLE = 'ACTION/SET_POST_ENABLE',
    
}

export const setIdPostEnable = createAction<string>(EPostActionType.SET_ID_POST_ENABLE);

export const setPostEnable = createAction<IPost>(EPostActionType.SET_POST_ENABLE);