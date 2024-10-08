import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers} from 'redux-persist';
import {ClassRoomReducer} from './classRoom/reducers';
import {GameChapterReducer} from './gameChapter/reducers';
import { QuestionPostReducer } from './questionPost/reducers';
const reducers = {
  classRoom: ClassRoomReducer,
  gameChapter: GameChapterReducer,
  questionPost: QuestionPostReducer,
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 5000,
  whitelist: [''],
};

// Setup Reducers
export const persistedRootReducer = persistCombineReducers(
  persistConfig,
  reducers,
);

export type RootState = ReturnType<typeof persistedRootReducer>;

export default persistedRootReducer;
